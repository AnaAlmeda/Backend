'use strict'

var ProjectModel = require ('../models/providers-models');
const {promisify} = require('util');
var ProviderController = () => {};
const path = require ('path');
const Joi = require('@hapi/joi');



/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROVEEDORES********************************************/

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


module.exports = ProviderController;