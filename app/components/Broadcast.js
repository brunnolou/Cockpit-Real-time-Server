const store = require('../store');

function Broadcast(action = 'updated', data) {
  const connections = Object.values(store.activeConnections);

  connections.forEach(({ connection }) => {
    try {
      const obj = JSON.stringify({ action, data });
      console.log('obj: ', obj);

      connection.sendUTF(obj);
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = Broadcast;
