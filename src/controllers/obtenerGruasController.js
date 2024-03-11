// obtenerGruasController.js
const { userData } = require('../data/datas');

const obtenerGruasDesdeBD = (req, res) => {
  userData.obtenerGruas((err, result) => {
    if (err) {
      console.error('Error al obtener grúas desde la base de datos:', err.message);
      res.status(500).json({ error: 'Error al obtener grúas' });
    } else {
      // Antes de enviar los resultados, agrega la URL base de las imágenes
      result.forEach((grua) => {
        grua.foto_path = `${req.app.locals.rutaBaseImagenes}/${grua.foto_path}`;      });

      res.status(200).json(result);
    }
  });
};

module.exports = { obtenerGruasDesdeBD };
