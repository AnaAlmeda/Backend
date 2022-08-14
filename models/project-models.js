'use strict'
const connection = require('./client-connection.js');
const conexion = connection();
const ProjectModel = () => {};


/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROYECTOS **********************************************/
ProjectModel.insertProyecto = (data) => {
    let promise = new Promise (async(resolve,reject) =>{
        try {
            await conexion.query('INSERT INTO proyectos SET ?', [data])
              resolve (problema); 
            
        } catch (error){
            reject (error);
        }      
    }); return promise
};


module.exports = ProjectModel;
