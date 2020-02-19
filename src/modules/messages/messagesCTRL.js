const log = require('../../../utils/general');

const Message = require('./messagesModel');

const response = {
  error: false,
  messages: [],
  info: '',
  data: {}
};
let status = 200;

const createMessage = async (req, res) => {
  log.info('Creando mensaje');
  const { target, message, user_id } = req.body;
  try {
    const messageX = await Message.create({ target, message, user_id });

    if (messageX === null || messageX === undefined) {
      status = 505;
      response.error = true;
      response.messages.push('Error guardando el mensaje');
    } else {
      //const rowNew = JSON.stringify(messageX, null, 4);
      response.info = `Mensaje Almacenado!.`;
      response.data = messageX;
    }

    res.status(status).json(response);
  } catch (err) {
    log.error(err.parent);
    const errorCode = err.parent.code || 0;
    let msgError = 'Error guardando el mensaje';
    if (errorCode === 'xxxxx') msgError = 'No existe el usuario creador';
    status = 505;
    response.error = true;
    response.messages.push(msgError);
    res.status(status).json(response);
  }
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