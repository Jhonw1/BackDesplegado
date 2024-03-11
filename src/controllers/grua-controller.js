const { userData } = require('../data/datas');
const path = require('path');
const fs = require('fs');

const addGrua = async (req, res) => {
    try {
        console.log('Recibida solicitud para agregar grúa');

        // Obtén la información de la grúa desde la solicitud
        const gruaInfo = req.body;
        console.log('Información de la grúa:', gruaInfo);

        const foto = req.file;
        console.log('Información de la imagen:', foto);

        // Verifica si la información de la imagen está presente
        if (foto) {
            gruaInfo.foto_path = foto.originalname;  // Corregir aquí
        }

        // Obtén el nuevoClienteId almacenado en la respuesta
        const clienteId = gruaInfo.clienteId;
        console.log('Cliente ID:', clienteId);

        // Llama a la función para agregar la grúa en la base de datos
        userData.addGrua(gruaInfo, clienteId, (err, result) => {
            if (err) {
                console.error('Error al agregar la grúa:', err.message);
                res.status(500).json({ error: 'Error al agregar la grúa' });
            } else {
                console.log('Grúa agregada exitosamente');

                // Verifica si result es un array antes de iterar sobre él
                if (Array.isArray(result)) {
                    result.forEach((grua) => {
                        grua.foto_path = `${req.app.locals.rutaBaseImagenes}/${grua.foto_path}`;
                    });

                    res.status(200).json(result);
                } else {
                    // Si no es un array, aún puedes procesar la respuesta como necesites
                    // Asegúrate de adaptar esto según tus necesidades
                    res.status(200).json([result]);
                }
            }
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
};


module.exports = { addGrua };
