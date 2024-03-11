const {check, validationResult} = require('express-validator');

let validatorParams = [
    check('user').isLength({min: 7, max: 255}),
    check('email').isEmail(),
    check('password').isLength({min: 8, max: 15}),
    check('phone').isLength({min: 5, max: 10})

];

function validator(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.error('Errores de validación:', errors.array());

        return res.status(422).json({ errors: errors.array()});
    }
    next();
}

module.exports = {
    validatorParams,
    validator
}