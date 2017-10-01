const WebSocketServer = require("websocket").server;

module.exports = httpServer => {
  const wsServer = new WebSocketServer({
    httpServer,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
  });

  function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }

  globalCounter = 0;
  allActiveConnections = {};

  wsServer.on("request", function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(
        new Date() + " Connection from origin " + request.origin + " rejected."
      );
      return;
    }

    const connection = request.accept("refresh-protocol", request.origin);

    var id = globalCounter++;
    allActiveConnections[id] = connection;
    connection.id = id;

    connection.sendUTF(
      JSON.stringify({
        action: "connected"
      })
    );

    console.log(new Date() + " Connection accepted.");

    connection.on("message", function(message) {
      if (message.type === "utf8") {
        console.log("Received Message: " + message.utf8Data);

        connection.sendUTF(
          JSON.stringify({
            action: "connected",
            message: message.utf8Data
          })
        );
      }
    });

    connection.on("close", function(reasonCode, description) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
			);

			delete allActiveConnections[connection.id];
    });
  });

  return wsServer;
};
