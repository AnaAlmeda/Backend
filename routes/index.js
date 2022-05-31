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
    //next();
};


//obtengo los datos desde la base de datos movies y los renderizo en la vista index (Lista los valores cargados en la base de datos)
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


//en esta seccion obtengo los datos desde un formulario y los (Alta)
router.get('/agregar', (req,res,next)=> {
    res.render('add-movie',{title: 'Agregar película'})
});


//Mediante el metodo post recibe los datos del formulario y los agrega en la base de datos (Alta)
router.post('/', (req,res,next) => {
    req.getConnection((err,movies) => {
        let movie = {
            movie_id : req.body.movie_id,
            title : req.body.title,
            estreno : req.body.estreno,
            rating : req.body.rating,
            image : req.body.image
        }
        console.log(movie);
        movies.query ('INSERT INTO movie SET ?',movie, (err,rows) => {
            return (err) ? res.redirect('/agregar') : res.redirect('/')
        })
    });
});


// con esta funcion realizo la modificacion (editar)
router.get('/editar/:movie_id', (req,res,next) => {
    let movie_id = req.params.movie_id;
    console.log(movie_id);
    req.getConnection((err,movies) => {
        movies.query('SELECT * FROM movie WHERE movie_id = ?', movie_id, (err,rows) =>{
            console.log(err, '---', rows);
            if (err){
                throw(err);
            }else{
                let locals = {
                    title: 'Editar pelicula',
                    data: rows
                };
                res.render('edit-movie', locals);
            }

        });

    });
});
router.use (error404);

module.exports = router;
