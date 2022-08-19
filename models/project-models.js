'use strict'
const connection = require('./client-connection.js');
const conexion = connection();
const ProjectModel = () => {};


/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/************************** PROYECTOS **********************************************/
ProjectModel.insertProject = (data) => {
    let promise = new Promise (async(resolve,reject) =>{
        try {
            await conexion.query('INSERT INTO proyectos SET ?', [data])
              resolve (); 
            
        } catch (error){
            reject (error);
        }      
    }); return promise
};


ProjectModel.allProjects = () =>{
    let promise = new Promise (async(resolve, reject) =>{
          const [rows,fields] = await conexion.query('SELECT * FROM proyectos')
          .catch((err) =>{
                reject(err)
          })
          resolve (rows)       
    }); return promise
}


ProjectModel.editProject = (data, id) => {
    let promise = new Promise ( async (resolve, reject) => {
          const res = await conexion.query('UPDATE proyectos SET ? WHERE id_proyecto = ?',[data,id])
                .catch((err) =>{
                      reject(err)
                })
                resolve(res)
    })
    return promise
}


ProjectModel.deleteProject = (id) => {
    let promise = new Promise ( async (resolve, reject) => {
          const res = await conexion.query('DELETE FROM proyectos WHERE id_proyecto = ?', id)
          .catch((err) =>{
                reject(err)
          })
          resolve (res)
    })
    return promise 
}



module.exports = ProjectModel;
