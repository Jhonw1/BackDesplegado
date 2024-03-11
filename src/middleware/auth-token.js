const nJwt = require('njwt');
const config = require('../config/keys');

let njwtAuth = (req, res, next) => {
  if (!req.header('Authorization')) {
    console.log('Token de autorización no proporcionado');
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  let sub = req.header('Authorization').split(' ')
  let token = sub[1];
  console.log("TOKEN RECIBIDO:", token);

  nJwt.verify(token, config.SIGNING_KEY_TOKEN, function(err, decoded) {
    if (err) {
      console.log('Error al verificar el token:', err);
      return res.status(400).send({ auth: false, message: err });
    } else {
      console.log('Token decodificado:', decoded);

      // Establecer el clienteId en res.locals
      res.locals.nuevoClienteId = decoded.clienteId;

      req.user = decoded;
      next();
    }
  });
};

module.exports = {
  njwtAuth
};
