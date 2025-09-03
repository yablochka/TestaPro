const { sendResponse, parseBody, verifyToken, loadUsers, saveUsers, TEST_LEVELS, getRandomQuestions } = require('../utils/helpers');
const { questions } = require('../data.js');

let users = [];
function initUsers() {
    users = loadUsers();
}
initUsers();

function handleGetTest(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return sendResponse(res, 401, { error: 'Token kerak' });
    }
    // Yangi foydalanuvchilar ma'lumotlarini yuklash
    const currentUsers = loadUsers();
    const user = currentUsers.find(user => user.token === token);
    if (!user) {
        return sendResponse(res, 401, { error: 'Noto\'g\'ri token' });
    }
    // Timer logikasini olib tashladik - endi har doim test topshirish mumkin
    const nextLevel = TEST_LEVELS[user.level];
    if (!nextLevel) {
        return sendResponse(res, 400, {
            error: 'Siz allaqachon eng yuqori darajadasiz',
            currentLevel: user.level
        });
    }
    const testQuestions = getRandomQuestions(nextLevel, 5);
    sendResponse(res, 200, {
        message: `${nextLevel} darajasi uchun test`,
        level: nextLevel,
        questions: testQuestions,
        totalQuestions: 5,
        passingScore: 3
    });
}

async function handleSubmitTest(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return sendResponse(res, 401, { error: 'Token kerak' });
    }
    // Yangi foydalanuvchilar ma'lumotlarini yuklash
    const currentUsers = loadUsers();
    const user = currentUsers.find(user => user.token === token);
    if (!user) {
        return sendResponse(res, 401, { error: 'Noto\'g\'ri token' });
    }
    const body = await parseBody(req);
    const { answers } = body;
    if (!answers || answers.length !== 5) {
        return sendResponse(res, 400, { error: 'Barcha savollarga javob bering' });
    }
    let correctAnswers = 0;
    const results = [];
    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const question = questions[answer.questionId];
        if (question && answer.answer === question.correct) {
            correctAnswers++;
            results.push({ questionId: answer.questionId, correct: true });
        } else {
            results.push({ questionId: answer.questionId, correct: false });
        }
    }
    const passed = correctAnswers >= 3;
    const nextLevel = TEST_LEVELS[user.level];
    if (passed && nextLevel) {
        user.level = nextLevel;
        if (user.testProgress) {
            user.testProgress = {
                currentLevel: nextLevel,
                completedTests: [...(user.testProgress?.completedTests || []), user.level],
                canTakeTest: true
            };
        } else {
            user.canTakeTest = true;
        }
        saveUsers(currentUsers);
    } else {
        // Test o'tilmagan, lekin timer yo'q - keyingi safar yana urinish mumkin
        if (user.testProgress) {
            user.testProgress = {
                ...user.testProgress,
                canTakeTest: true
            };
        } else {
            user.canTakeTest = true;
        }
        saveUsers(currentUsers);
    }
    sendResponse(res, 200, {
        message: passed ? 'Tabriklaymiz! Test muvaffaqiyatli o\'tildi' : 'Test o\'tilmadi',
        score: correctAnswers,
        totalQuestions: 5,
        passed: passed,
        results: results,
        newLevel: passed ? nextLevel : user.level,
        canTakeNextTest: passed && TEST_LEVELS[nextLevel]
    });
}

function handleGetTestProgress(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return sendResponse(res, 401, { error: 'Token kerak' });
    }
    // Yangi foydalanuvchilar ma'lumotlarini yuklash
    const currentUsers = loadUsers();
    const user = currentUsers.find(user => user.token === token);
    if (!user) {
        return sendResponse(res, 401, { error: 'Noto\'g\'ri token' });
    }
    const nextLevel = TEST_LEVELS[user.level];
    sendResponse(res, 200, {
        currentLevel: user.level,
        nextLevel: nextLevel,
        canTakeTest: true, // Timer yo'q - har doim test topshirish mumkin
        completedTests: user.testProgress?.completedTests || [],
        isMaxLevel: !nextLevel
    });
}

module.exports = {
    handleGetTest,
    handleSubmitTest,
    handleGetTestProgress
}; 