'use strict'

var ProjectModel = require ('../models/project-models');
const bcryptjs = require ('bcryptjs');
const {promisify} = require('util');
var ProjectController = () => {};
const path = require ('path');
const Joi = require('@hapi/joi');
const jtoken = require('jsonwebtoken');



/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROYECTOS ************************************************/

ProjectController.crearProyecto = (req, res, next) => {
    let proyecto= req.body;
    console.log (proyecto);    

    ProjectModel.insertProyecto(proyecto)
        .then(() => {
            locals = {
                status: 'ok',
                desc: 'Nuevo Usuario guardado',
                data: 'buena'
                }
                res.json(locals)
            
                    
        })
        .catch(err => {
            console.log(err);
            console.log(err[0]);
            if (err[0] == undefined || err[0] == null){
                let locals = {
                status: 'ok',
                desc: 'Nuevo Usuario guardado',
                data: 'buena'
                }
                res.json(locals)
        }else{
             res.json({
                status: 'error',
                desc: 'Hubo un problema conectando al Server',
                data: err
                })        }
            
        })
};



ProjectController.allProjects = (req, res, next) => {
    console.log('hola');
    ProjectModel.allProjects()
      .then(rows => {
        console.log(rows)
        let locals = {
          status: 'ok',
          desc: 'Usuario Encontrado',
          data: rows
        }
        res.json(locals)
      })
      .catch(err => {
        let locals = {
          status: 'error',
          desc: 'Error al Encontrar al Usuario',
          data: err
        }
        res.json(locals)
      })
  };


module.exports = ProjectController;



