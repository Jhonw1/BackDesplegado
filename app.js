const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const signingKey = require('./config/keys');
const validateToken = require('./routes/GetAuthentication');
const auth = require('../src/routes/getJwt');
const login = require('./routes/login');
const register = require('./routes/register');
const gruasRoutes = require('./routes/gruasRutes');
const getGruasInfoRoute = require('./routes/getGruasInfo');
const cors = require('cors');

const app = express().use(cors()).use(bodyParser.json()).use(cookieParser(signingKey.SIGNING_KEY_COOKIE));

// Establece la ruta base de las imágenes
app.locals.rutaBaseImagenes = '/ruta-base-imagenes'; // Cambia esto según tus necesidades

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/register', register);
app.use('/login', login);
app.use('/readToken', validateToken);
app.use('/gruas', gruasRoutes);
app.use('/getGruasInfo', getGruasInfoRoute);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
