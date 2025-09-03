const fs = require('fs');
const crypto = require('crypto');
const { questions } = require('../data.js');

const USERS_FILE = './users.json';

const USER_LEVELS = [
    "Mutaxassis",
    "Yetakchi mutaxassis",
    "Bosh mutaxassis",
    "Bo'lim boshlig'i o'rinbosari",
    "Bo'lim boshlig'i"
];

const TEST_LEVELS = {
    "Mutaxassis": "Yetakchi mutaxassis",
    "Yetakchi mutaxassis": "Bosh mutaxassis",
    "Bosh mutaxassis": "Bo'lim boshlig'i o'rinbosari",
    "Bo'lim boshlig'i o'rinbosari": "Bo'lim boshlig'i"
};

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

function verifyToken(token) {
    const users = loadUsers();
    return users.find(user => user.token === token);
}

function getRandomQuestions(level, count = 5) {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(q => ({
        id: questions.indexOf(q),
        title: q.title,
        variants: q.variants
    }));
}

function parseBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                resolve({});
            }
        });
    });
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function loadUsers() {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            return JSON.parse(data);
        } else {
            fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
            return [];
        }
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

function saveUsers(users) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

module.exports = {
    hashPassword,
    generateToken,
    verifyToken,
    getRandomQuestions,
    parseBody,
    sendResponse,
    loadUsers,
    saveUsers,
    USER_LEVELS,
    TEST_LEVELS
}; 