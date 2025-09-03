const { sendResponse, parseBody, hashPassword, generateToken, verifyToken, loadUsers, saveUsers, USER_LEVELS } = require('../utils/helpers');
const fs = require('fs');

// Data file path
const USERS_FILE = './users.json';

// User levels
// USER_LEVELS imported from helpers

// Initialize users data
let users = [];

// Load users from file on startup
function initUsers() {
    users = loadUsers();
}
initUsers();

async function handleRegister(req, res) {
    const body = await parseBody(req);
    const { username, email, password, level } = body;

    if (!username || !email || !password) {
        return sendResponse(res, 400, { error: 'Barcha maydonlar to\'ldirilishi kerak' });
    }
    if (users.find(user => user.email === email)) {
        return sendResponse(res, 400, { error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }
    const userLevel = level || "Mutaxassis";
    if (!USER_LEVELS.includes(userLevel)) {
        return sendResponse(res, 400, { error: 'Noto\'g\'ri daraja', availableLevels: USER_LEVELS });
    }
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password: hashPassword(password),
        level: userLevel,
        createdAt: new Date().toISOString(),
        testProgress: {
            currentLevel: userLevel,
            completedTests: [],
            canTakeTest: true
        }
    };
    users.push(newUser);
    saveUsers(users);
    sendResponse(res, 201, {
        message: 'Foydalanuvchi muvaffaqiyatli yaratildi',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            level: newUser.level
        }
    });
}

async function handleLogin(req, res) {
    const body = await parseBody(req);
    const { email, password } = body;
    if (!email || !password) {
        return sendResponse(res, 400, { error: 'Email va parol kiritilishi kerak' });
    }
    const user = users.find(u => u.email === email && u.password === hashPassword(password));
    if (!user) {
        return sendResponse(res, 401, { error: 'Noto\'g\'ri email yoki parol' });
    }
    const token = generateToken();
    user.token = token;
    saveUsers(users);
    sendResponse(res, 200, {
        message: 'Muvaffaqiyatli kirildi',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            level: user.level
        }
    });
}

function handleLogout(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
        const user = users.find(u => u.token === token);
        if (user) {
            delete user.token;
            saveUsers(users);
        }
    }
    sendResponse(res, 200, { message: 'Muvaffaqiyatli chiqildi' });
}

function handleProfile(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return sendResponse(res, 401, { error: 'Token kerak' });
    }
    const user = users.find(user => user.token === token);
    if (!user) {
        return sendResponse(res, 401, { error: 'Noto\'g\'ri token' });
    }
    sendResponse(res, 200, {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            level: user.level,
            createdAt: user.createdAt,
            testProgress: user.testProgress || {
                currentLevel: user.level,
                completedTests: [],
                canTakeTest: true
            }
        }
    });
}

function handleGetLevels(req, res) {
    sendResponse(res, 200, {
        levels: USER_LEVELS,
        message: 'Mavjud foydalanuvchi darajalari'
    });
}

// Barcha foydalanuvchilarni o'chirish uchun endpoint
function handleClearUsers(req, res) {
    // Faylni bo'shatamiz
    users = [];
    saveUsers(users);
    sendResponse(res, 200, { message: 'Barcha foydalanuvchilar o\'chirildi!' });
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
    handleProfile,
    handleGetLevels,
    handleClearUsers // yangi qo'shildi
}; 