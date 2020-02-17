const bcrypt = require('bcrypt');

const log = require('../../../utils/general');

let response = {
  error: false,
  messages: [],
  info: ''
};
let status = 200;

const createUser = async (req, res) => {
  try {
    log.info('Creando mensaje');
    const { pass } = req.body;
    log.info(`Pass= ${pass}`);
    const saltRounds = 15;

    const hash = await bcrypt.hash(pass, saltRounds);
    /*bcrypt.hash(pass, saltRounds, (err, hash) => {
      if (err) {
        status = 505;
        response.error = true;
        response.messages.push('Error generando HASH del Pass');
      } else {
        response.info = `Pass generado OK.. save user. HASH: ${hash}`;
      }
      res.status(status).json(response);
    });*/
    response.info = `Pass generado OK.. save user. HASH: ${hash}`;
    res.status(status).json(response);
  } catch (err) {
    log.error(err);
    status = 505;
    response.error = true;
    response.messages.push('Error generando HASH del Pass');
    res.status(status).json(response);
  }
};

const updateUser = (req, res) => {
  log.info('Actualizando mensaje');
};

const deleteUser = (req, res) => {
  log.info('Borrando mensaje');
};

const getAllUser = (req, res) => {
  log.info('Mostrando todos los mensajes');
  response.info = 'Mostrando usuarios';
  res.status(status).json(response);
};

const getOneUser = (req, res) => {
  log.info('Mostrando un mensaje');
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser
};
