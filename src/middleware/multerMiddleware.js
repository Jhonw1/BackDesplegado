// multerMiddleware.js

const multer = require('multer');

const storage = multer.memoryStorage(); // Puedes ajustar esto según tus necesidades
const upload = multer({ storage: storage });

module.exports = upload;
