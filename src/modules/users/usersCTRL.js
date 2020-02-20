const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
  resetResponse();
  try {
    const { nick, pass } = req.body;

    const userX = await User.findOne({ where: { nick } });
    if (userX === undefined || userX === null) {
      responseError(400, ['Usuario o contraseña incorrecta.']);
    } else {
      const isEqual = await bcrypt.compare(pass, userX.pass);
      if (!isEqual) {
        responseError(400, ['Usuario o contraseña incorrecta']);
      } else {
        response.info = 'Acceso TOTAL !!!!!';
        const tk = jwt.sign({ id: userX.id, name_: userX.name_, nick: userX.nick },
          process.env.JWT,
          // 60 => 60seg o 1m
          // 60 * 10 => 10 minutos
          // 5m, 5h, 5d => Minutos, horas, dias..
          { expiresIn: '10m' });
        response.data.tk = tk;

        userX.token = tk;
        await userX.save();
      }
    }
  } catch (err) { 
    log.error(err.parent);
    responseError(505, ['Error al ingresar al sistema']);
  }
  res.status(status).json(response);
};

const validateRow = async id => {
  const userX = await User.findByPk(id);

  if (userX === undefined || userX === null) {
    responseError(505, ['No se encontró el usuario']);
    return false;
  }
  return userX;
};

const createUser = async (req, res) => {
  resetResponse();
  try {
    log.info('Creando usuario');
    const { name_, nick } = req.body;
    let { pass } = req.body;
    pass += '';

    const hash = await bcrypt.hash(pass, saltRounds);

    const userX = await User.create({ name_, nick, pass: hash });

    if (userX === null || userX === undefined) {
      responseError(505, ['Error guardando el usuario']);
    } else {
      const userNew = JSON.stringify(userX, null, 4);

      response.info = `Usuario Almacenado!. USER: ${userNew}`;
      response.data = userX;
    }
  } catch (err) {
    log.error(err.parent);
    const errorCode = err.parent.code || 0;
    let msgError = 'Error generando HASH o Guardando el usuario';
    if (errorCode === '23505') msgError = 'Nick en uso';
    responseError(505, [msgError]);
  }

  res.status(status).json(response);
};

const updateUser = async (req, res) => {
  resetResponse();
  log.info('Actualizando Usuario');

  const { id, name_, nick, pass } = req.body;

  if (id === undefined || id === null) {
    responseError(505, ['No hay identificador para el usuario']);
    res.status(status).json(response);
  } else {
    const userX = await validateRow(id);

    if (userX) {
      try {
        const hash = await bcrypt.hash(pass, saltRounds);

        userX.name_ = name_;
        userX.nick = nick;
        userX.pass = hash;
        await userX.save();

        response.info = 'Usuario actualizado';
        response.data = userX;
      } catch (err) {
        log.error(err.parent);
        const errorCode = err.parent.code || 0;
        let msgError = 'Error generando HASH o Actualizando el usuario';
        if (errorCode === '23505') msgError = 'Nick en uso';
        responseError(505, [msgError]);
      }
    }
    res.status(status).json(response);
  }
};

const deleteUser = async (req, res) => {
  resetResponse();
  log.info('Borrando Usuario');

  const { id } = req.body;

  if (id === undefined || id === null) {
    responseError(505, ['No hay identificador para el usuario']);
    res.status(status).json(response);
  } else {
    const userX = await validateRow(id);

    if (userX) {
      await userX.destroy();

      response.info = 'Usuario borrado';
    }
    res.status(status).json(response);
  }
};

const getAllUser = async (req, res) => {
  resetResponse();
  log.info('Mostrando todos los usuarios');

  const users = await User.findAll();

  response.info = 'Mostrando todos los Usuarios';
  response.data = users;
  res.status(status).json(response);
};

const getOneUser = async (req, res) => {
  resetResponse();
  log.info('Mostrando un user');

  const { id } = req.params;
  const userX = await validateRow(id);

  if (userX) {
    response.info = 'Usuario encontrado';
    response.data = userX;
  }
  res.status(status).json(response);
};

module.exports = {
  login,
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser
};
