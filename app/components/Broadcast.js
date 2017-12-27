const store = require('../store');
const events = require('../events');

function Broadcast(event, data) {
  const connections = Object.values(store.activeConnections);

  if (!Object.values(events).includes(event)) return console.log('Invalid event:', event);

  connections.forEach(({ connection, id }) => {
    if (!connection) return;

    connection.send(JSON.stringify({ event, data }));

    console.log('Broadcasted event: ', id, event);
  });

  return Object.keys(store.activeConnections);
}

module.exports = Broadcast;
