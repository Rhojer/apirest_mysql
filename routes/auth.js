const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const conection = require('../config/conectSQL.js');

const { env } = require('process');


// consulta sql
ruta.post('/', async( req, res) =>{

        await conection.query(`SELECT * FROM usuario WHERE email = 'rhojer24@gmail.com';`, (err, rows) =>{
            if(err){
                const {sqlMessage: error} = err
                res.status(400).json({msj:'error en la consulta a la base de datos: ', error})
              console.log(err)
              conection.end();
            }
            else {
                let [{id, nombre, email, password, rol_id}] = rows;
                const token = jwt.sign({datausuario: {id: id, nombre: nombre, email: email, password: password, rol: rol_id }
                },'secret', { expiresIn: '1h' });
                conection.end();
                res.json(token);
                console.log(rows);
                console.log(rows.length)
                
            }

        })

});











module.exports = ruta;