'use strict'

var ProjectModel = require ('../models/providers-models');
const {promisify} = require('util');
var ProviderController = () => {};
const path = require ('path');
const Joi = require('@hapi/joi');



/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROVEEDORES - ABM**************************************/

ProviderController.altaProveedor = (req, res, next) => {
    let proveedor= req.body;
    console.log (proveedor);    

    ProviderModel.insertProveedor(proveedor)
        .then(() => {
            locals = {
                status: 'ok',
                desc: 'Nuevo proveedor guardado',
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
                desc: 'Nuevo proveedor guardado',
                data: 'buena'
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


ProviderController.allProviders = (req, res, next) => {
    console.log('hola');
    ProviderModel.allProvider()
      .then(rows => {
        console.log(rows)
        let locals = {
          desc: 'listando proveedores, ok',
          data: rows
        }
        res.json(locals)
      })
      .catch(err => {
        let locals = {
          status: 'error',
          desc: 'Error al Encontrar al Proveedor',
          data: err
        }
        res.json(locals)
      })
  };




  ProviderController.editProvider = (req, res, next) => {
  let Proveedores = req.body;
  let id = req.params.id;

  ProviderModel.editProvider(Proveedores,id)
    .then(() => {
      let locals = {
        data: {message:"edicion exitosa"}
      }
      res.json(locals)
    })
    .catch(err => {
      let locals = {
        desc: 'error editando el proveedor',
        data: err
      }
      res.status(403).json(locals)
    })
};



ProviderController.deleteProvider = (req, res, next) => {
  let id = req.params.id
  ProviderModel.deleteProvider(id)
    .then(() => {
      let locals = {
        data: {message:"proyecto eliminado con exito"}
      }
      res.json(locals)
    })
    .catch(err => {
      let locals = {
        desc: 'Error al intentar eliminar el proveedor',
        data: err
      }
      res.status(403).json(locals)
    })
};


module.exports = ProviderController;