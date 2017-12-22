const webSocketServer = require('./webSocketServer');
const webServer = require('./webServer');

const httpServer = webServer();

webSocketServer(httpServer);
