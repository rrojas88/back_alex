const log = require('../../utils/general');

// Rutas
const rUsers = require('./users');
const rMessages = require('./messages');


module.exports = app => {
  app.use('/api1/users', rUsers);
  app.use('/api1/messages', rMessages);
};
