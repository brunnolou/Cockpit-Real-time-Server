const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const Broadcast = require('./components/Broadcast');

function webServer() {
  const app = express();
  const httpServer = app.listen(config.httpPort);

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/update', (req, res) => {
    Broadcast('update', req.body);

    res.end();
  });

  app.get('/update', (req, res) => {
    Broadcast('update');

    res.send('update was broadcasted');
  });

  return httpServer;
}

module.exports = webServer;
