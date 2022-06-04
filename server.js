'use strict'


var app = require ('./app');
var server = app.listen (app.get('port'), () => {
  console.log ('server iniciado en el puerto:', app.get('port'));
});

