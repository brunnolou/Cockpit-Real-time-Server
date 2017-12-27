const store = require('../store');
const events = require('../events');
const Broadcast = require('./Broadcast');

function Connect(connection, req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  const id = store.globalCounter;

  store.activeConnections[id] = { connection, id };

  // Connected.
  connection.send(JSON.stringify({ event: events.CONNECT }));
  store.globalCounter += 1;

  connection.on('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (error) {
      return;
    }

    Broadcast(data.event, data.entry);
  });

  connection.on('error', (error) => {
    console.log(`${new Date()} Peer ${ip} disconnected. ${error}`);
    delete store.activeConnections[connection.id];
  });

  connection.on('close', (error) => {
    console.log(`${new Date()} Peer ${ip} disconnected. ${error}`);
    delete store.activeConnections[connection.id];
  });
}

module.exports = Connect;
