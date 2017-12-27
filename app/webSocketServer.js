const WebSocket = require('ws');
const Connect = require('./components/Connect');

function webSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (connection, req) => {
    Connect(connection, req);
  });
}

module.exports = webSocketServer;
