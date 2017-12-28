const express = require('express');
const bodyParser = require('body-parser');

const Broadcast = require('./components/Broadcast');
const config = require('./config');
const { events } = require('./events');

function webServer() {
  const app = express();
  const httpServer = app.listen(config.httpPort);

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/update', (req, res) => {
    const { body: { event, args } } = req;

    Broadcast({ event, entry: args[1], collection: args[0] });

    res.send('ok');
  });

  app.get('/update', (req, res) => {
    const result = Broadcast({ event: events.COLLECTIONS_SAVE_AFTER, data: {} });

    if (result === true) {
      res.send('update was broadcasted!');
    } else {
      console.log('result: ', result);
      res.send('Error! not broadcasted');
    }
  });

  return httpServer;
}

module.exports = webServer;
