const mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'first_apirest'
  });
/* const conexion = mysql.createConnection({
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
 */

module.exports = pool;
