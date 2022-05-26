'use strict'

var express = require ('express');
var router = express.Router();
var movies = require ('../models/movies');



function error404(req, res, next)
{
    let error = new Error();
        locals = {
            title : 'Error 404',
            description : 'Recurso no encontrado',
            error : error
        };
    error.status = 404;
    res.render ('error',locals);
    next();
};


router.get ('/', (req,  res, next) => {
    req.getConnection ((err, movies) => {
      movies.query ('SELECT * FROM movie', (err, rows) => {
        let locals = {
            title : 'Lista películas',
            data : rows
        };
        res.render ('index', locals);
      });

    });
    res.send ('<h1>terminamos la configuración </h1>');
});

router.use (error404);

module.exports = router;
