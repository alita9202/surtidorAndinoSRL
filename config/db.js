const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'surtidorandino'
});

connection.connect((error) => {
    if (error) {
        console.error('❌ No se logró la conexión a la BD:', error);
    } else {
        console.log('✅ Conexión exitosa a la base de datos "surtidorandino"');
    }
});

module.exports = connection;
