const express = require('express');
const jwt = require('jsonwebtoken');
const ruta = express.Router();
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const pool = require('../config/conectSQL.js');
const fs = require('fs');
const config = require('config');

 

ruta.post('/', ( req, res) =>{
                // consulta sql
        pool.query(`SELECT * FROM usuario WHERE email = '${req.body.email}';`, (err, rows) =>{
=======
const conection = require('../config/conectSQL.js');
const fs = require('fs');
const config = require('config');



ruta.post('/', ( req, res) =>{
                // consulta sql
        conection.query(`SELECT * FROM usuario WHERE email = '${req.body.email}';`, (err, rows) =>{
>>>>>>> dcffd4a92ecff2642bda0de74b96be1ffacec6be
            if(err){
                const {sqlMessage: error} = err
                res.status(400).json({msj:'error en la consulta a la base de datos: ', error})

<<<<<<< HEAD
=======
              conection.end();
>>>>>>> dcffd4a92ecff2642bda0de74b96be1ffacec6be
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
<<<<<<< HEAD
                },config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });
                
=======
                },config.set('configToken.SEED'), { expiresIn: config.set('configToken.expiration') });
                conection.end();
>>>>>>> dcffd4a92ecff2642bda0de74b96be1ffacec6be
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