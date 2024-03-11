const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // Asegúrate de tener instalado el paquete 'jsonwebtoken'
const { userData } = require('../data/datas');
const config = require('../config/keys');


const handleResponse = (res, message) => {
    return (error, data) => {
        if (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        } else if (!data) {
            res.status(404).json({ message });
        } else {
            res.status(200).json(data);
        }
    };
};

const register = (req, res) => {
    userData.addClient(req.body, (err) => {
        if (err) {
            console.error("Error al registrar el usuario: ", err);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
        res.status(200).json({ message: "Usuario registrado exitosamente" });
    });

};

module.exports = { register };
