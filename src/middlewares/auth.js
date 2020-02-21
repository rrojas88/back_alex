const jwt = require('jsonwebtoken');
const { targets } = require('./static');

const validateHostname = (req, res, nextFunction) => {
  // Comprobar HostName
  console.log(`HOSTAME= ${req.hostname}`);
  if (req.hostname !== 'localhost') {
    console.log('Es produccion..');
    res.status(403).json({
      error: true,
      messages: ['Ambiente NO valido: Prod'],
      info: '',
      data: {}
    });
  } else {
    nextFunction();
  }
};

const validateApp = (req, res, nextFunction) => {
  const { key_app } = req.body;
  if (key_app === undefined || key_app === null) {
    res.status(403).json({
      error: true,
      messages: ['No viene la App'],
      info: '',
      data: {}
    });
  } else {
    const targetBD = targets.michel;
    if (targetBD.key_app !== key_app) {
      res.status(403).json({
        error: true,
        messages: ['No se encontró la App'],
        info: '',
        data: {}
      });
    } else {
      nextFunction();
    }
  }
};

const validateAppDeviceAlex = (req, res, nextFunction) => {
  const { key_app, key_device } = req.body;

  if (
    key_app === undefined ||
    key_app === null ||
    key_device === undefined ||
    key_device === null
  ) {
    res.status(403).json({
      error: true,
      messages: ['No viene la App/Device'],
      info: '',
      data: {}
    });
  } else {
    const targetBD = targets.alexa;

    if ( targetBD.key_app !== key_app ) {
      res.status(403).json({
        error: true,
        messages: ['No se encontró la App alex'],
        info: '',
        data: {}
      });
    } else if ( targetBD.key_device !== key_device ) {
      res.status(403).json({
        error: true,
        messages: ['No se encontró Device alex'],
        info: '',
        data: {}
      });
    } else {
      nextFunction();
    }
  }
};

const isAuth = (req, res, nextFunction) => {
  const { token } = req.headers;

  if (token === undefined || !token) {
    res.status(403).json({
      error: true,
      messages: ['Ingreso invalido -> No tk'],
      info: '',
      data: {}
    });
  } else {
    try {
      const dataToken = jwt.verify(token, process.env.JWT);
      // Posible Validaciones con info que esta en el Token..

      // Poner datos en "sesion" para posterior usarlo en la funcion ste:
      //req.sessionData = { user_id: dataToken.user_id };
      req.sessionData = { dataToken };
      // O crear mas Middlewares para Permisos/Roles

      nextFunction();
    } catch (err) {
      res.status(500).json({
        error: true,
        messages: [`Error validando el token: ${err.message}`],
        info: '',
        data: {}
      });
    }
  }
};

const validateDevice = (req, res, nextFunction) => {
  const { key_device } = req.body;
  if (key_device === undefined || key_device === null) {
    res.status(403).json({
      error: true,
      messages: ['No viene Device'],
      info: '',
      data: {}
    });
  } else {
    const targetBD = targets[req.sessionData.dataToken.name_];
    if (!targetBD || targetBD.key_device !== key_device) {
      res.status(403).json({
        error: true,
        messages: ['No se encontró Device'],
        info: '',
        data: {}
      });
    } else {
      nextFunction();
    }
  }
};

module.exports = {
  validateHostname,
  validateApp,
  validateAppDeviceAlex,
  isAuth,
  validateDevice
};
