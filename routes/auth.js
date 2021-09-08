const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const bcrypt = require('bcrypt');
const conection = require('../config/conectSQL.js');

const { env } = require('process');



ruta.post('/', async( req, res) =>{
                // consulta sql
        await conection.query(`SELECT * FROM usuario WHERE email = '${req.body.email}';`, (err, rows) =>{
            if(err){
                const {sqlMessage: error} = err
                res.status(400).json({msj:'error en la consulta a la base de datos: ', error})

              conection.end();
            }
            else {
                console.log(rows);
                if(rows.length == 0){ return res.status(400).json({msj: 'usuario o password invalido'});}
                let [{id, nombre, email, password, rol_id}] = rows;
                     //validando password:
                const passwordValidado = bcrypt.compareSync(req.body.password, password);
                if(!passwordValidado){
                    return res.status(400).json({msj: 'usuario o password invalido..'});
                }
                else{
                    //creando el token de acceso:
                const token = jwt.sign({datausuario: {id: id, nombre: nombre, email: email, password: password, rol: rol_id }
                },'secret', { expiresIn: '1h' });
                conection.end();
                res.json(token);
                }
            }

        })

});











module.exports = ruta;