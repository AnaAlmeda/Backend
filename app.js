'use strict'

var express = require ('express');
var favicon = require ('serve-favicon');
var bodyParser = require ('body-parser');
var morgan = require ('morgan');
var routes = require ('./routes/index.js');
//const faviconURL = __dirname + '/public/img/node-favicon.png';
const publicDir = __dirname + '/public';
const viewDir = __dirname + '/views';
const port = (process.env.PORT || 4000);
const app = express();

app.set ('views', viewDir);
app.set ('view engine', 'jade'); 
app.set ('port', port);
//app.use (favicon(faviconURL));
app.use (bodyParser.json());
//parse application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({extended: false}));
app.use (morgan('dev'));
app.use (publicDir);
app.use (routes);


module.exports = app;

