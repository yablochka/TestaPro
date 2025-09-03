const http = require('http');
const { handleRequest } = require('./routes');

// Create server
const server = http.createServer(handleRequest);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishga tushdi`);
    console.log(`http://localhost:${PORT}`);
}); 