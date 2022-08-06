'use strict'
const connection = require('./client-connection.js');
const conexion = connection();
const ClientModel = () => {};


ClientModel.getAll = (cb) => connection.query ('SELECT * FROM clientes',cb);

ClientModel.insert = (data,cb) => conexion.query ('INSERT INTO users SET ?', data, cb);

ClientModel.getOne = (id, cb) => connection.query('SELECT * FROM clientes WHERE cliente_id = ?', id, cb);

ClientModel.update = (data, cb) => connection.query('UPDATE clientes SET ? WHERE cliente_id = ?',[data,data.cliente_id], cb);

ClientModel.eliminar = (id, cb) => connection.query('DELETE FROM clientes WHERE cliente_id = ?', id, cb);

ClientModel.verificar = (id,cb) => connection.query('SELECT * FROM clientes WHERE cliente_id =?',id,cb);

ClientModel.verificar = (id) => {

    let promise = new Promise (async(resolve, reject) =>{
        console.log(id)
        const [rows,fields] = await conexion.query('SELECT * FROM users WHERE mail = ?', id)
        .catch((err) =>{
              reject(err)
        })
        resolve (rows)       
  }); return promise
}

module.exports = ClientModel;


