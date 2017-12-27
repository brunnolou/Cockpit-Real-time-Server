const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const events = require('./events');
const Broadcast = require('./components/Broadcast');

function webServer() {
  const app = express();
  const httpServer = app.listen(config.httpPort);

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/update', (req, res) => {
    const { body: { event, args } } = req.body;

    Broadcast(event, args);

    res.send('ok');
  });

  app.get('/update', (req, res) => {
    const conns = Broadcast(events.COLLECTIONS_SAVE_AFTER);

    res.send(`update was broadcasted <pre>${JSON.stringify(conns)}`);
  });

  return httpServer;
}

module.exports = webServer;
