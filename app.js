'use strict'

var express = require ('express');
var favicon = require ('serve-favicon');
var bodyParser = require ('body-parser');
var morgan = require ('morgan');
const hbs = require ('hbs');
hbs.registerPartials (__dirname + '/views/partials', function (err){});
var routes = require ('./routes/client-router');
var restFul = require('express-method-override')('_method');
require ('dotenv').config();
//const faviconURL = __dirname + '/public/img/node-favicon.png';
const publicDir = express.static(__dirname + '/public');
const viewDir = __dirname + '/views';
const port = (process.env.PORT || 8200);
const app = express();
const cors = require ('cors');

//rutas para validar el token
const validateToken = require ('./routes/validate-token');


app.set ('views', viewDir);
app.set ('view engine', 'hbs'); 
app.set ('port', port);
var corsOptions = {
    origin: 'http://localhost:9000', // Reemplazar con dominio
}
app.use(cors(corsOptions));

//app.use (favicon(faviconURL));
app.use (bodyParser.json());
//parse application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({extended: false}));
app.use (restFul);
app.use (morgan('dev'));
app.use (publicDir);
app.use (routes)
app.use (validateToken);


module.exports = app;

