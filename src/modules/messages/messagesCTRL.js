const log = require('../../../utils/general');

const Message = require('./messagesModel');
const User = require('../users/usersModel');

const usersCTRL = require('../users/usersCTRL');

const response = {
  error: false,
  messages: [],
  info: '',
  data: {}
};
let status = 200;

const resetResponse = () => {
  response.error = false;
  response.messages = [];
  response.info = '';
  response.data = {};

  status = 200;
};

const responseError = (status_, messages) => {
  status = status_;
  response.error = true;
  messages.forEach(msg => {
    response.messages.push(msg);
  });
};

const validateRow = async id => {
  const messageX = await Message.findByPk(id);

  if (messageX === undefined || messageX === null) {
    responseError(505, ['No se encontró el mensaje']);
    return false;
  }
  return messageX;
};

const createMessage = async (req, res) => {
  resetResponse();
  log.info('Creando mensaje');

  const { target, message } = req.body;

  const userX = await usersCTRL.getUserByName( target );

  if ( !userX ) {
    responseError(505, [`No se encontró el usuario ${target} en la base de datos`]);
  } else {
    try {
      const user_id = userX.id;
      const messageX = await Message.create({ target, message, user_id });

      if (messageX === null || messageX === undefined) {
        responseError(505, ['Error guardando el mensaje']);
      } else {
        response.info = `Mensaje Almacenado!.`;
        response.data = messageX;
      }
    } catch (err) {
      log.error(err.parent);

      const errorCode = err.parent.code || 0;
      let msgError = 'Error guardando el mensaje';

      if (errorCode === '23503') msgError = 'No existe el usuario creador';
      responseError(505, [msgError]);
    }
  }
  res.status(status).json(response);
};

const updateMessage = async (req, res) => {
  resetResponse();
  log.info('No se actualizara mensaje');

  const { id, target, message, new_ } = req.body;

  if (id === undefined || id === null) {
    responseError(505, ['No hay identificador para el mensaje']);
    res.status(status).json(response);
  } else {
    const messageX = await validateRow(id);

    if (messageX) {
      messageX.target = target;
      messageX.message = message;
      messageX.new_ = new_;
      await messageX.save();

      response.info = 'Mensaje actualizado';
      response.data = messageX;
    }
    res.status(status).json(response);
  }
};

const deleteMessage = async (req, res) => {
  resetResponse();
  log.info('Borrando mensaje');

  const { id } = req.body;

  if (id === undefined || id === null) {
    responseError(505, ['No hay identificador para el mensaje']);
    res.status(status).json(response);
  } else {
    const messageX = await validateRow(id);

    if (messageX) {
      await messageX.destroy();

      response.info = 'Mensaje borrado';
    }
    res.status(status).json(response);
  }
};

const getAllMessage = async (req, res) => {
  resetResponse();
  log.info('Mostrando todos los mensajes');

  // attributes: ['id', ['name', 'title']]
  const messages = await Message.findAll({
    //include: [ User ]
    include: [{ model: User, attributes: ['id', 'name_', 'nick'] }]
  });

  response.info = 'Mostrando todos los mensajes';
  response.data = messages;
  res.status(status).json(response);
};

const getAllMyMessages = async (req, res) => {
  resetResponse();
  log.info('Mostrando todos mis mensajes');
  const user_id = req.sessionData.dataToken.id;

  const messages = await Message.findAll({
    where: { user_id, new_: true },
    include: [{ model: User, attributes: ['id', 'name_', 'nick'] }]
  });

  response.info = 'Mostrando todos mis mensajes';
  response.data = messages;
  res.status(status).json(response);
};

const getOneMessage = async (req, res) => {
  resetResponse();
  log.info('Mostrando un mensaje');

  const { id } = req.params;
  const messageX = await validateRow(id);

  if (messageX) {
    response.info = 'Mensaje encontrado';
    response.data = messageX;
  }
  res.status(status).json(response);
};

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
  getAllMessage,
  getOneMessage,
  getAllMyMessages
};
