const fetch = require('node-fetch');
const { cockpit } = require('./config');

const jsonRequest = (url, options = {}) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  ...options,
}).then(res => res.json());

const fetchCockpit = qs =>
  jsonRequest([cockpit.base, 'collections', 'get', qs.collection].join('/'), { qs });

module.exports = {
  fetchCockpit,
  jsonRequest,
};
