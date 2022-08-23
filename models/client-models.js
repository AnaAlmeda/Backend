'use strict'
const connection = require('./client-connection.js');
const conexion = connection();
const ClientModel = () => {};

/**********************************************************************************/
/**********************************************************************************/
/**********************************************************************************/
/*********************** USUARIOS ***************************************************/
ClientModel.insert = (data,cb) => conexion.query ('INSERT INTO users SET ?', data, cb);


ClientModel.verificar = (id) => {

    let promise = new Promise (async(resolve,reject) =>{
        try {
            const [rows,fields] = await conexion.query('SELECT * FROM users WHERE mail = ?', id)
            if (rows.length > 0){
                resolve (rows);
            }else{
                let data = {
                    message: 'El usuario no existe'
                };
                throw (data);
            }            
        } catch (error){
            reject (error);
        }      
    }); return promise
}




/*

ClientModel.getAll = (cb) => connection.query ('SELECT * FROM clientes',cb);



ClientModel.getOne = (id, cb) => connection.query('SELECT * FROM clientes WHERE cliente_id = ?', id, cb);

ClientModel.update = (data, cb) => connection.query('UPDATE clientes SET ? WHERE cliente_id = ?',[data,data.cliente_id], cb);

ClientModel.eliminar = (id, cb) => connection.query('DELETE FROM clientes WHERE cliente_id = ?', id, cb);

*/

module.exports = ClientModel;


