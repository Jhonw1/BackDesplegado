const mysql = require('mysql2');
const registered = require('../models/registered');


const database = mysql.createConnection({
    host: 'bzo2b3nm7cxjki3izepq-mysql.services.clever-cloud.com',
    user: 'uzwfbfua6h9yze8z',
    password: '4gpIBRwAyf3eZYJ1HzEf',
    database: 'bzo2b3nm7cxjki3izepq',

})
database.connect();



class userData {
    static addClient(user, callback) {
        console.log(user)
        const query = "INSERT INTO clients ( user, email, password, phone ) VALUES (  ?, ?, ?, ?)";
        database.query(query, [user.user, user.email, user.password, user.phone], (err, result) => {
            if (err) {
                console.error("Error registered " + err.message);
                callback(err, null);
            } else {
                console.log("Client registered successfully");
                callback(null, true);
            }
        });
    }

    // static obtenerInformacionUsuario(id, callback) {
    //     const query = 'SELECT * FROM Clients WHERE id = ?';
    //     database.query(query, [id], (err, result) => {
    //         if (err) {
    //             console.error('Error al obtener la información del usuario: ' + err.message);
    //             callback(err, null);
    //         } else if (result.length === 0) {
    //             callback(null, null);
    //         } else {
    //             const usuario = result[0];
    //             callback(null, usuario);
    //         }
    //     });
    // }

    static login(user, callback) {
        const query = 'SELECT * FROM clients WHERE email = ? AND password = ?';
        database.query(query, [user.email, user.password], (err, result) => {
            if (err) {
                console.error('Error al autenticar el usuario: ' + err.message);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const user = result[0];
                callback(null, user);
            }
        });
    }
}






module.exports = {
    userData
}
