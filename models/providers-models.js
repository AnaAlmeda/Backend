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

ProviderModel.allProvider = () =>{
    let promise = new Promise (async(resolve, reject) =>{
          //console.log(id)
          const [rows,fields] = await conexion.query('SELECT * FROM proyectos')
          .catch((err) =>{
                reject(err)
          })
          resolve (rows)       
    }); return promise
}


ProviderModel.editProvider = (data, id) => {
    let promise = new Promise ( async (resolve, reject) => {
          const res = await conexion.query('UPDATE proyectos SET ? WHERE id_proyecto = ?',[data,id])
                .catch((err) =>{
                      reject(err)
                })
                resolve(res)
    })
    return promise
}


ProviderModel.deleteProvider = (id) => {
    let promise = new Promise ( async (resolve, reject) => {
          const res = await conexion.query('DELETE FROM proyectos WHERE id_proyecto = ?', id)
          .catch((err) =>{
                reject(err)
          })
          resolve (res)
    })
    return promise 
}



module.exports = ProviderModel;
