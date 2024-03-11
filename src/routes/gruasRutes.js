const express = require('express');
const router = express.Router();
const gruaController = require('../controllers/grua-controller');
const multerMiddleware = require('../middleware/multerMiddleware');

router.post('/',multerMiddleware.single('foto') , gruaController.addGrua);

// Otras rutas relacionadas con grúas si es necesario
module.exports = router;