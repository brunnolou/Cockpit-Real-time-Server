const WebSocketServer = require('websocket').server;
const WebSocketRouter = require('websocket').router;
const Connect = require('./components/Connect');

const originIsAllowed = origin => true || origin;

function webSocketServer(httpServer) {
  const wsServer = new WebSocketServer({
    httpServer,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false,
  });

  // Ws Router.
  const router = new WebSocketRouter();

  router.attachServer(wsServer);

  // Accepts all protocols.
  router.mount('*', '*', (request) => {
    if (!originIsAllowed(request.origin)) return request.reject();

    const connection = request.accept(request.origin);

    // @TODO check request.protocol
    Connect(connection, request);
  });
}

module.exports = webSocketServer;
