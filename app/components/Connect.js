const store = require('../store');

function Connect(connection, { resourceURL: { query } }) {
  const id = store.globalCounter;

  store.activeConnections[id] = {
    collection: query.collection,
    connection,
    id,
    query,
  };

  // Connected.
  connection.sendUTF(JSON.stringify({ action: 'connected' }));
  store.globalCounter += 1;

  connection.on('message', (message) => {
    if (message.type !== 'utf8') return;

    // Broadcast.
    Object.values(store.activeConnections).forEach(({ connection: conn, ...rest }) => {
      conn.sendUTF(JSON.stringify({
        action: 'updated',
        message: message.utf8Data,
        ...rest,
      }));
    });
  });

  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected. ${description}`);

    delete store.activeConnections[connection.id];
  });
}

module.exports = Connect;
