const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const conection = require('../config/conectSQL.js');

const { env } = require('process');


// consulta sql
ruta.post('/', async( req, res) =>{

        await conection.query(`SELECT * FROM usuario WHERE EMAIL = 'rhojer24@gmail.com';`, (err, rows) =>{
            if(err){
                const {sqlMessage: error} = err
                res.status(400).json({msj:'error en la consulta a la base de datos: ', error})
              console.log(err)
              conection.end();
            }
            else {
                let [{ID, NOMBRE, EMAIL, PASSWORD, PROFESOR}] = rows;
                const token = jwt.sign({datausuario: {id: ID, nombre: NOMBRE, email: EMAIL, password: PASSWORD, profesor: PROFESOR }
                },'secret', { expiresIn: '1h' });
                conection.end();
                res.json(token);
                console.log(rows);
                console.log(rows.length)
                
            }

        })

});











module.exports = ruta;