const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/conectSQL.js');
const fs = require('fs');
const config = require('config');

 

ruta.post('/', ( req, res) =>{
                // consulta sql
        pool.query(`SELECT * FROM usuario WHERE email = '${req.body.email}';`, (err, rows) =>{
            if(err){
                const {sqlMessage: error} = err
                res.status(400).json({msj:'error en la consulta a la base de datos: ', error})

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
                let token = jwt.sign({datausuario: {id: id, nombre: nombre, email: email, password: password, rol: rol_id }
                },config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });
                
                let algo = token
                fs.writeFile('config/token.txt',algo , (error) =>{
                    if(error) throw error;
                    return res.json({
                        msj: 'usuario conectado correctamente'
                    })
                })
                }
            }

        })

});











module.exports = ruta;