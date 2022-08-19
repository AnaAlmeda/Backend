'use strict'

var express = require ('express');
const ClientController = require('../controllers/client-controller');
const ProjectController = require('../controllers/project-controller');
const ProviderController = require('../controllers/providers-controller');
var router = express.Router();
const verifyToken = require('./validate-token');


/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/*********************** USUARIOS ***************************************************/



//prueba de una ruta protegida
//router.get('/protegida', verifyToken, ClientController.protegida);



//alta de usuario
//router.post('/registroOK', ClientController.registroOK);



//Login del usuario
//router.get ('/login',ClientController.login);

//el usuario ya ingreso al sistema
router.post('/loginOK', ClientController.loginOK);


/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROYECTOS ************************************************/


//alta de proyecto
router.post('/altaProyecto', ProjectController.crearProyecto);

//busqueda de proyectos
router.get ('/allProyectos', ProjectController.allProjects);

//editar proyectos
router.put ('/editarProyecto',ProjectController.editProject);

//eliminar proyecto
router.delete('/eliminarProyecto',ProjectController.deleteProject)





/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROVEEDORES ************************************************/
router.post('/altaProveedor', ProviderController.altaProveedor);















module.exports = router;














































/*
//alta de cliente
router.get('/agregar', ClientController.addForm);


//Inserta los clientes en la BD
router.post('/', ClientController.insert);


// Traigo los datos de un solo cliente y los edito
router.get('/editar/:cliente_id', ClientController.getOne);

//Edito los datos en la BD
router.post('/actualizar/:cliente_id', ClientController.update);

//Eliminar el cliente
router.post('/eliminar/:cliente_id', ClientController.eliminar);


//Muestro el error
router.use (ClientController.error404);


//Login del usuario
//router.get ('/', ClientController.login);


//registracion de usuario
router.get ('/register', ClientController.register);


//envia los datos ingresados en el login
router.post ('/ingreso',ClientController.Ingreso)
*/

