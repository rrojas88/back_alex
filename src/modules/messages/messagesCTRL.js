const log = require('../../../utils/general');

const createMessage = (req, res) => {
  log.info('Creando mensaje');
};

const updateMessage = (req, res) => {
  log.info('Actualizando mensaje');
};

const deleteMessage = (req, res) => {
  log.info('Borrando mensaje');
};

const getAllMessage = (req, res) => {
  log.info('Mostrando todos los mensajes');
};

const getOneMessage = (req, res) => {
  log.info('Mostrando un mensaje');
};

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
  getAllMessage,
  getOneMessage
}