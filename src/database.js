const mysql = require ('mysql');

const { database } = require ('./keys');
const { promisify } = require ('util');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexión con la base de datos se cerro');
        }
        if (err.code == 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION A LA BASE DE DATOS FUE RECHAZADA');
        }
    }

    if (connection) connection.release(); // con esto empieza la conexión
    console.log('LA BASE DE DATOS ESTA CONECTADA');
    return;
});
 //promesas para consultas
pool.query = promisify(pool.query)
module.exports = pool;
