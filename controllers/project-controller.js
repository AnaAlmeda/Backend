'use strict'

var ProjectModel = require ('../models/project-models');
const bcryptjs = require ('bcryptjs');
var ProjectController = () => {};



/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROYECTOS ************************************************/

ProjectController.crearProyecto = (req, res, next) => {
    let proyecto= req.body;
    console.log (proyecto);    

    ProjectModel.insertProject(proyecto)
        .then(() => {
            let locals = {
                desc: 'Nuevo Usuario guardado',
                data: {
                  message: 'ingreso correctos'
                  }
                }
                res.json(locals)
            
                    
        })
        .catch(err => {
            console.log(err);
            console.log(err[0]);
            if (err[0] == undefined || err[0] == null){
                let locals = {
                desc: 'Nuevo Usuario guardado',
                data: {
                  message: 'ingreso correctos soy el catch'
                  }
                }
                res.json(locals)
        }else{
             res.json({
                status: 'error',
                desc: 'Hubo un problema conectando al Server',
                data: err
                })       
        }
            
      })
};



ProjectController.allProjects = (req, res, next) => {
    console.log('hola');
    ProjectModel.allProjects()
      .then(rows => {
        console.log(rows)
        let locals = {
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




ProjectController.editProject = (req, res, next) => {
  let Proyectos = req.body;
  let id = req.params.id;

  ProjectModel.editProject(Proyectos,id)
    .then(() => {
      let locals = {
        data: {message:"edicion exitosa"}
      }
      res.json(locals)
    })
    .catch(err => {
      let locals = {
        desc: 'error editando el proyecto',
        data: err
      }
      res.status(403).json(locals)
    })
};



ProjectController.deleteProject = (req, res, next) => {
  let id = req.params.id
  ProjectModel.deleteProject(id)
    .then(() => {
      let locals = {
        data: {message:"proyecto eliminado con exito"}
      }
      res.json(locals)
    })
    .catch(err => {
      let locals = {
        desc: 'Error al intentar eliminar el proyecto',
        data: err
      }
      res.status(403).json(locals)
    })
};





module.exports = ProjectController;



