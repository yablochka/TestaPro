const url = require('url');
const { handleRegister, handleLogin, handleLogout, handleProfile, handleGetLevels, handleClearUsers } = require('./controllers/userController');
const { handleGetTest, handleSubmitTest, handleGetTestProgress } = require('./controllers/testController');
const { sendResponse } = require('./utils/helpers');

async function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    try {
        if (method === 'POST' && path === '/testa2/register') {
            await handleRegister(req, res);
        } else if (method === 'POST' && path === '/testa2/login') {
            await handleLogin(req, res);
        } else if (method === 'POST' && path === '/testa2/logout') {
            handleLogout(req, res);
        } else if (method === 'GET' && path === '/testa2/profile') {
            handleProfile(req, res);
        } else if (method === 'GET' && path === '/testa2/levels') {
            handleGetLevels(req, res);
        } else if (method === 'GET' && path === '/testa2/tests/current') {
            handleGetTest(req, res);
        } else if (method === 'POST' && path === '/testa2/tests/submit') {
            await handleSubmitTest( req, res);
        } else if (method === 'GET' && path === '/testa2/tests/progress') {
            handleGetTestProgress(req, res);
        } else if (method === 'POST' && path === '/testa2/clear-users') {
            handleClearUsers(req, res);
        } else if (method === 'GET' && path === '/testa2/') {
            sendResponse(res, 200, {
                message: 'Node.js Authentication & Test Server',
                endpoints: {
                    'POST /testa2/register': 'Ro\'yxatdan o\'tish',
                    'POST /testa2/login': 'Tizimga kirish',
                    'POST /testa2/logout': 'Chiqish',
                    'GET /testa2/profile': 'Profil ma\'lumotlari',
                    'GET /testa/levels': 'Mavjud darajalar',
                    'GET /testa/tests/current': 'Joriy test savollari',
                    'POST /testa/tests/submit': 'Test natijalarini yuborish',
                    'GET /testa/tests/progress': 'Test progress holati'
                }
            });
        } else {
            sendResponse(res, 404, { error: 'Sahifa topilmadi' });
        }
    } catch (error) {
        console.error('Server error:', error);
        sendResponse(res, 500, { error: 'Server xatosi' });
    }
}

module.exports = { handleRequest }; 