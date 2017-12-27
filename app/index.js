const webSocketServer = require('./webSocketServer');
const webServer = require('./webServer');

// Start web server
const httpServer = webServer();

// Start Sockets server
webSocketServer(httpServer);
