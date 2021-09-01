const mysql = require('mysql');

const conexion = mysql.createConnection({
    host : 'localhost',
    database : 'first_apirest',
    user : 'root',
    password : 'root'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});


module.exports = conexion;
