'use strict'

var express = require ('express');
var router = express.Router();
var client = require ('../models/client-connection');



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
};


//obtengo los datos para mostrar en home
router.use (client);
router.get ('/', (req, res, next) => {
    req.getConnection ((err, client) => {
      client.query ('SELECT * FROM clientes', (err, rows) => {
          if (err){
              next(new Error ('no hay clientes para mostrar'));
          }else{
                var locals = {
                    title : 'Lista de clientes cargados',
                    data : rows
                };
                res.render ('index', locals);
          }
      });
    });
});


//formulario para alta de cliente
router.get('/agregar', (req,res,next)=> {
    res.render('add-cliente',{title: 'Ingreso de cliente nuevo'})
});


//Alta de cliente en BD
router.post('/', (req,res,next) => {
    req.getConnection((err,client) => {
        if(err){
            return(err) ? next ( new Error ('hubo un error al insertar los datos en la base de datos')) : res.redirect('/agregar')
        }else{
            let cliente = {
                cliente_id : req.body.cliente_id,
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                edad : req.body.edad,
                foto : req.body.foto,
                direccion : req.body.direccion,
                telefono : req.body.telefono
            }
            console.log(cliente);
            client.query ('INSERT INTO clientes SET ?',cliente, (err,rows) => {
                return (err) ? res.redirect('/agregar') : res.redirect('/')
            });
        }
    });
});


// Edicion de algun dato del cliente
router.get('/editar/:cliente_id', (req,res,next) => {
    let cliente_id = req.params.cliente_id;
    req.getConnection((err,client) => {
        client.query('SELECT * FROM clientes WHERE cliente_id = ?', cliente_id, (err,rows) =>{
            console.log(err, '---', rows);
            if (err){
                return(err) ? next ( new Error ('no se encontro registro alguno')) : res.redirect('/');
            }else{
                let locals = {
                    title: 'Editar datos del cliente',
                    data: rows
                };
                res.render('edit-cliente', locals);
            }

        });

    });
});

//Realizo la edicion en la base de datos
router.post('/actualizar/:cliente_id', (req, res, next) => {
    req.getConnection((err,client) => {
        let cliente = {
            cliente_id : req.body.cliente_id,
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            edad : req.body.edad,
            foto : req.body.foto,
            direccion : req.body.direccion,
            telefono : req.body.telefono
        }
        console.log(cliente);
        client.query ('UPDATE clientes SET ? WHERE cliente_id = ?',[cliente,cliente.cliente_id], (err,rows) => {
            return (err) ? next ( new Error ('no se encontro registro alguno')) : res.redirect('/')
        });
    });    
});



//Eliminar
router.post('/eliminar/:cliente_id',(req,res,next) => {
    let cliente_id = req.params.cliente_id;
    console.log(cliente_id);
    req.getConnection((err,client) => {
        client.query('DELETE FROM clientes WHERE cliente_id = ?', cliente_id, (err,rows) =>{
            console.log(err, '---', rows);
            return(err) ? next ( new Error ('no se puede borrar')) : res.redirect('/')
        });

    });

});


router.use (error404);

module.exports = router;
