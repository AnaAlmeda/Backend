'use strict'
const connection = require('./client-connection.js');
const conexion = connection();
const ProviderModel = () => {};


/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROYECTOS **********************************************/
ProviderModel.insertProveedor = (data) => {
    let promise = new Promise (async(resolve,reject) =>{
        try {
            await conexion.query('INSERT INTO proveedores SET ?', [data])
              resolve (problema); 
            
        } catch (error){
            reject (error);
        }      
    }); return promise
};


module.exports = ProviderModel;
