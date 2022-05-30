'use strict'

var express = require ('express');
var router = express.Router();
var movies = require ('../models/movies');



function error404(req, res, next)
{
    let error = new Error();
        var locals = {
            title : 'Error 404',
            description : 'Recurso no encontrado',
            error : error
        };
    error.status = 404;
    res.render ('error',locals);
    next();
};

router.use (movies);
router.get ('/', (req, res, next) => {
    req.getConnection ((err, movies) => {
      movies.query ('SELECT * FROM movie', (err, rows) => {
            var locals = {
                title : 'Lista películas',
                data : rows
            };
            res.render ('index', locals);
      });
    });
});

router.use (error404);

module.exports = router;
