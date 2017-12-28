const store = require('../store');
const events = require('../events');

function Broadcast(data) {
  const connections = Object.values(store.activeConnections);

  if (!Object.values(events).includes(data.event)) {
    return console.log('Invalid event:', data.event);
  }

  connections.forEach(({ connection, id }) => {
    if (!connection) return;

    const response = { ...data, event: data.event.replace('cockpit:', '') };

    connection.send(JSON.stringify(response), (error) => {
      if (!error) return;

      // If connection no longer exists delete it.
      delete connections[id];
    });

    console.log('Broadcasted event: ', [id], response.event);
  });

  return Object.keys(store.activeConnections);
}

module.exports = Broadcast;
