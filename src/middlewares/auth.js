const jwt = require('jsonwebtoken');

const validateHostname = (req, res, nextFunction) => {
  // Comprobar HostName
  console.log(`HOSTAME= ${req.hostname}`);
  if (req.hostname !== 'localhost') {
    console.log('Es produccion..');
  } else {
    nextFunction();
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
      const dataToken = jwt.verify( token, process.env.JWT );
      // Posible Validaciones con info que esta en el Token..

      // Poner datos en "sesion" para posterior usarlo en la funcion ste:
      req.sessionData = { user_id: dataToken.user_id };
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

module.exports = { validateHostname, isAuth };
