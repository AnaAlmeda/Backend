'use strict'

var mysql =  require ('mysql');
var dbConf = require ('dbclient.json')

var dbOptions = {
    host : dbConf.mysql.host,
    port : dbConf.mysql.port,
    user : dbConf.mysql.user,
    password : dbConf.mysql.password,
    database : dbConf.mysql.database
};

var connection = mysql.createConnection(dbOptions);

connection.connect((err) => {
    return (err) ? console.log(`Error al conectarse a la BD : $ {err.stack}`) : console.log('conexion exitosa de la Bd');
});

module.exports = connection;