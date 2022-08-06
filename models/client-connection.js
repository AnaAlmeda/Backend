const mysql = require('../node_modules/mysql2/promise');

module.exports = () => {
    //return mysql.createConnection
    return mysql.createPool
    ({
        "host" : "localhost",
        "port" : 3306,
        "user" : "root",
        "password" : "",
        "database" : "user"
    });
}