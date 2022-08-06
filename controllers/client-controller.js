'use strict'

var ClientModel = require ('../models/client-models.js');
const bcryptjs = require ('bcryptjs');
const {promisify} = require('util');
var ClientController = () => {};
const path = require ('path');
const Joi = require('@hapi/joi');
const jtoken = require('jsonwebtoken');





const schemaRegister = Joi.object({
    nombre: Joi.string().min(4).max(255).required(),
    mail: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

const schemaLogin = Joi.object({
    mail: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

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


//muestra el formulario de login
ClientController.registro = (req,res, next) => {
    res.render ('registro');
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


//Pagina para loguearse
ClientController.login = async (req,res, next) => {
    res.render ('login');
};

//Validacion del logueo
ClientController.loginOK = (req ,res, next) => {  
    //realizo la primera validacion de los campos del login
    const { error } = schemaLogin.validate(req.body)
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    //asigno los valores a constantes
    const mail =  req.body.mail;
    const pass = req.body.password;
    

    //Modelo para verificar si el mail existe
    ClientModel.verificar(mail)
        .then(async (rows) => {
            //console.log('Usuarios:', rows)
            let locals = {
                status: 'ok',
                desc: 'el usuario existe',
                data: rows[0]
            }
            //res.json(locals.data.password)
            const validPassword = await bcryptjs.compare(pass, locals.data.password);
            if (!validPassword)
            {
                return res.status(400).json({ error: 'contraseña no válida' });
            }else{
                const nombre = locals.data.nombre;
                const iduser = locals.data.id_user;


                
                const token = jtoken.sign({
                    name: nombre,
                    id: iduser
                }, process.env.TOKEN_SECRET)


                res.header('auth-token', token).json({
                    error: null,
                    data: {token}
                })

                /*res.json({
                    error: null,
                    data: 'exito bienvenido',
                    token: jtoken,
                    nombre,
                    iduser
                });*/
            }
        })       
        .catch(err => {
            let locals = {
                status: 'error',
                desc: 'No le devuelve ningun valor, error',
                data: err
            }
            res.json(locals)        
        });
        
};


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




    

    
    /*if(validPassword){
        return res.json ({
            message: 'loginOK'
        });
    }else{
        return res.json ({
            message: 'problemas con login'
        });
    }*/
    /*ClientModel.verificarMail(mail, async(error,results)=>{
        if (results.length == 0 ){
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }else{
            const validPassword = await bcryptjs.compare(pass, results[0].password);
            if (!validPassword)
            {
                return res.status(400).json({ error: 'contraseña no válida' });
            }else{
                res.json({
                    error: null,
                    data: 'exito bienvenido'
                });
            }
        }*/

    
    
    
/*

    try {    
        ClientModel.verificarMail(mail, async(error,results)=>{
            if (results.length == 0 ){
                return res.status(400).json({ error: 'Usuario no encontrado' });
            }else{
                if (!validPassword)
                {
                    return res.status(400).json({ error: 'contraseña no válida' });
                }else{
                    res.json({
                        error: null,
                        data: 'exito bienvenido'
                    });
                }
            }
        });
    } catch (error) {
        return res.status(400).json({ error: 'Problemas conectandose con la bd' });
    };*/
/*


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

