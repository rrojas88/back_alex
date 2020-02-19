const bcrypt = require('bcrypt');

const User = require('./usersModel');

const log = require('../../../utils/general');

const response = {
  error: false,
  messages: [],
  info: '',
  data: {}
};
let status = 200;
const saltRounds = 15;

const createUser = async (req, res) => {
  try {
    log.info('Creando usuario');
    //log.info(req.body);
    const { name_, nick } = req.body;
    let { pass } = req.body;
    pass += '';

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

    const userX = await User.create({ name_, nick, pass: hash });

    if (userX === null || userX === undefined) {
      status = 505;
      response.error = true;
      response.messages.push('Error guardando el usuario');
    } else {
      const userNew = JSON.stringify(userX, null, 4);
      response.info = `Usuario Almacenado!. USER: ${userNew}`;
      response.data = userX;
    }

    res.status(status).json(response);
  } catch (err) {
    log.error(err.parent);
    const errorCode = err.parent.code || 0;
    let msgError = 'Error generando HASH o Guardando el usuario';
    if (errorCode === '23505') msgError = 'Nick en uso';
    status = 505;
    response.error = true;
    response.messages.push(msgError);
    res.status(status).json(response);
  }
};

const updateUser = async (req, res) => {
  log.info('Actualizando Usuario');
  const { id, name_, nick, pass } = req.body;
  if (id === undefined || id === null) {
    status = 505;
    response.error = true;
    response.messages.push('No hay identificador para el usuario');
    res.status(status).json(response);
  } else {
    const userX = await User.findByPk(id);
    if (userX === undefined || userX === null) {
      status = 505;
      response.error = true;
      response.messages.push('Usuario no encontrado');
    } else {
      const hash = await bcrypt.hash(pass, saltRounds);

      userX.name_ = name_;
      userX.nick = nick;
      userX.pass = hash;
      await userX.save();

      response.info = 'Usuario actualizado';
      response.data = userX;
    }
    res.status(status).json(response);
  }
};

const deleteUser = async (req, res) => {
  log.info('Borrando Usuario');
  const { id } = req.body;
  if (id === undefined || id === null) {
    status = 505;
    response.error = true;
    response.messages.push('No hay identificador para el usuario');
    res.status(status).json(response);
  } else {
    const userX = await User.findByPk(id);
    log.info(userX);
    if (userX === undefined || userX === null) {
      status = 505;
      response.error = true;
      response.messages.push('Usuario no encontrado');
    } else {
      await userX.destroy();

      response.info = 'Usuario borrado';
    }
    res.status(status).json(response);
  }
};

const getAllUser = async (req, res) => {
  log.info('Mostrando todos los usuarios');
  const users = await User.findAll();
  response.info = 'Mostrando todos los Usuarios';
  response.data = users;
  res.status(status).json(response);
};

const getOneUser = async (req, res) => {
  log.info('Mostrando un user');
  const { id } = req.params;
  const userX = await User.findByPk(id);
  if (userX === undefined || userX === null) {
    status = 505;
    response.error = true;
    response.messages.push('Error guardando el usuario');
  } else {
    response.info = 'Usuario encontrado';
    response.data = userX;
  }
  res.status(status).json(response);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser
};
