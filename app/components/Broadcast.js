const store = require('../store');
const { isValid } = require('../events');

function Broadcast(data) {
  const connections = Object.values(store.activeConnections);

  if (!isValid(data.event)) {
    console.log('Invalid event:', data.event);
    return false;
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

  return true;
}

module.exports = Broadcast;
