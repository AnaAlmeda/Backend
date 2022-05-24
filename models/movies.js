'use strict'

var mysql =  require ('mysql');
var myConnection = require ('express-myconnection');
var dbOptions = {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '',
    database : 'movies'
};


Movies = myConnection (mysql, dbOptions, 'request');

module.exports = Movies;