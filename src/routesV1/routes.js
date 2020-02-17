const log = require('../../utils/general');

// Rutas
const r_users = require('./users');
const r_messages = require('./messages');

const bd = require('../bd1');

module.exports = app => {
  app.use('/api1/users', r_users);
  app.use('/api1/messages', r_messages);
};
