const store = require('../store');
const events = require('../events');
const Broadcast = require('./Broadcast');

function Connect(connection, { protocol }) {
  const id = store.globalCounter;

  store.activeConnections[id] = { connection, id };

  // Connected.
  connection.sendUTF(JSON.stringify({ event: events.CONNECT }));
  store.globalCounter += 1;

  connection.on('message', (message) => {
    if (message.type !== 'utf8') return;

    // Only broadcast preview messages.
    if (protocol !== 'preview-protocol') return;

    Broadcast(events.COLLECTIONS_PREVIEW);
  });

  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected. ${description}`);

    delete store.activeConnections[connection.id];
  });
}

module.exports = Connect;
