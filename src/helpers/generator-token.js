const nJwt = require('njwt');

const secretKey = 'mysecretkey 1234567890';

let generateToken = (properties, delay = 0) => {
    let jwt = nJwt.create(properties, secretKey);
    jwt.setExpiration(new Date().getTime() + 60 * 60 * 1000);
    jwt.setNotBefore(delay);
    return jwt.compact();
}


module.exports = generateToken;