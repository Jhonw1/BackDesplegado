const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const signingKey = require('./src/config/keys');
const validateToken = require('./src/routes/GetAuthentication');
const auth = require('./src/routes/getJwt');
const login = require('./src/routes/login');
const register = require('./src/routes/register');
const cors = require('cors');
// const getUserInfo = require('./routes/getUserInfo');

const app = express().use(cors()).use(bodyParser.json()).use(cookieParser(signingKey.SIGNING_KEY_COOKIE));
app.use('/register', register);
app.use('/login', login);
app.use('/readToken', validateToken);
// app.use('/getInfo', getUserInfo);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
