const nJwt = require('njwt');
const config = require('../config/keys');

let njwtAuth = (req, res, next) => {
  if (!req.header('Authorization')) {
    console.log('Token de autorización no proporcionado');
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  let sub = req.header('Authorization').split(' ')
  let token = sub[1];
  console.log("TOKEN RECIBIDO:", token);  // Log para verificar que el token se recibe correctamente.

  nJwt.verify(token, config.SIGNING_KEY_TOKEN, function(err, decoded) {
    if (err) {
      console.log('Error al verificar el token:', err);
      return res.status(400).send({ auth: false, message: err });
    } else {
      console.log('Token decodificado:', decoded);  // Log para verificar que el token se decodifica correctamente.
      req.user = decoded;  // Establecer el usuario decodificado en el objeto de solicitud
      next();
    }
  });
};

module.exports = {
  njwtAuth
};
