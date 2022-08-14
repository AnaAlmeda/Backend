'use strict'

var ClientModel = require ('../models/client-models.js');
const bcryptjs = require ('bcryptjs');
const {promisify} = require('util');
var ClientController = () => {};
const path = require ('path');
const Joi = require('@hapi/joi');
const jtoken = require('jsonwebtoken');

/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/*********************** USUARIOS ***************************************************/


const schemaRegister = Joi.object({
    nombre: Joi.string().min(4).max(255).required(),
    mail: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

const schemaLogin = Joi.object({
    mail: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

//Validacion del logueo
ClientController.loginOK = (req ,res, next) => {  
    //realizo la primera validacion de los campos del login
    const { error } = schemaLogin.validate(req.body)
    if (error) {
        return res.status(400).json(
            {description: 'ups! problemas para ingresar',
             data:{message:error.details[0].message}}
        )
    }

    //asigno los valores a constantes
    const mail =  req.body.mail;
    const pass = req.body.password;
    

    //Modelo para verificar si el mail existe
    ClientModel.verificar(mail)
        .then(async (rows) => {
            let locals = {
                status: 'ok',
                desc: 'el usuario existe',
                data: rows[0]
            }
            //res.json(locals.data.password)
            const validPassword = await bcryptjs.compare(pass, locals.data.password);
            if (!validPassword)
            {
                let data = {
                    message: 'Constrasenia incorrecta senora'
                };
                throw(data);
            }else{
                const nombre = locals.data.nombre;
                const iduser = locals.data.id_user;

                //Token
                const token = jtoken.sign({
                    name: nombre,
                    id: iduser
                }, process.env.TOKEN_SECRET)

                console.log(token);

                res.header('auth-token', token).json({
                    data: {token}
                })
            }
        })       
        .catch(err => {            
            console.log(err);
            let locals = {
                description: 'ups! problemas para ingresar',
                data: err
            }
            res.status (405).json(locals);    
        });
        
};

// Controller para el error
ClientController.error404= (req, res, next) => {
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


//Ingreso los valores en la BD, Falta realizar los controles
ClientController.registroOK = async (req ,res, next) => {
    

    //valido el usuario a registrar
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    //encriptacion de password
    const pass = req.body.password;
    const salt = await bcryptjs.genSalt(10);
    const passHash = await bcryptjs.hash(pass, salt);
    

    //se arma el objeto
    let user = {
        nombre :  req.body.nombre,
        mail : req.body.mail,
        password : passHash
    };

    //console.log (user);
    try {
        ClientModel.insert(user, (error) => {
            if(error){
                let locals = {
                    title : 'error al intentar insertar los valores en la db',
                    description : 'error de sintaxis sql',
                    error : error
                }
                res.json (locals);
            }else{
                
                res.json (user);
            };
         });
    } catch (error) {
        let locals = {
            title : 'error 500',
            description : 'ops algo ocurrio',
            error : error
        }
       
        res.json(locals);
    };
    
};









/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROVEEDORES *********************************************/












/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** EQUIPOS ************************************************/


//prueba de una ruta protegida
ClientController.protegida = (req, res, next) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
};


   

module.exports = ClientController;




        


//Llamo al modelo y a la vista que me devolvera todos los valores guardados en la base de datos
/*ClientController.getAll = (req ,res, next) => {
    ClientModel.getAll ((err, rows) => {
        if (err){
            let locals = {
                title : 'error al consultar la db',
                description : 'error de sintaxis sql',
                errot : err
            }
            res.render ('error',locals);
        }else{
            var locals = {
                title : 'Lista de clientes cargados',
                data : rows
            };
            res.render ('index', locals);
        }
    });
};

//Lo utilizo para mostrar el formulario que dara de alta a un usuario
ClientController.addForm = (req, res, next)=> res.render('add-cliente',{title: 'Ingreso de cliente nuevo'});



//Inserto los valores en la base de datos
ClientController.insert = (req, res, next) => {
    let cliente = {
        cliente_id : req.body.cliente_id,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        edad : req.body.edad,
        foto : req.body.foto,
        direccion : req.body.direccion,
        telefono : req.body.telefono
    };

    console.log(cliente);

    ClientModel.insert(cliente, (err) => {
            if(err){
                let locals = {
                    title : 'error al intentar insertar los valores en la db',
                    description : 'error de sintaxis sql',
                    errot : err
                }
                res.render ('error',locals);
            }else{
                res.redirect ('/');
            };
    });
};










//obtengo el usuario para editarlo
ClientController.getOne = (req, res, next) => {
    let cliente_id = req.params.cliente_id;

    ClientModel.getOne(cliente_id, (err, rows) => {
        console.log(err, '-----' , rows)
        if (err){
            let locals = {
                title : 'problemas para editar este usuario',
                description : 'error de sintaxis sql',
                errot : err
            }
            res.render ('error',locals);

        }else{
            let locals = {
                title: 'Editar datos del cliente',
                data: rows
            };
            res.render('edit-cliente', locals);
        };

    });
};


//actualizacion de la informacion
ClientController.update = (req, res, next) => {
    let cliente = {
        cliente_id : req.body.cliente_id,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        edad : req.body.edad,
        foto : req.body.foto,
        direccion : req.body.direccion,
        telefono : req.body.telefono
    };
    console.log(cliente);

    ClientModel.update(cliente, (err) => {
        if(err){
            let locals = {
                title : 'error al intentar modificar el campo seleccionado',
                description : 'error de sintaxis sql',
                errot : err
            }
            res.render ('error',locals);
        }else{
            res.redirect ('/');
        }
    });
};



//elimino el usuario
ClientController.eliminar = (req, res, next) => {
    console.log('ingresa en eliminar');
    let cliente_id = req.params.cliente_id;
    console.log(cliente_id);

        ClientModel.eliminar(cliente_id, (err,rows) =>{
            console.log(err, '---', rows);
            if(err){
                let locals = {
                    title : 'error al intentar eliminar el campo',
                    description : 'error de sintaxis sql',
                    errot : err
                }
                res.render ('error',locals);
            }else{
                res.redirect ('/');
            }
        });
};


*/

