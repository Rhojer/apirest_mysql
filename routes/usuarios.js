const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const ruta = express.Router();
const conection = require('../config/conectSQL.js');


ruta.get('/', (req,res) =>{
    res.send('get de usuario');
})

ruta.post('/', async (req, res) =>{
    let { nombre, email, password} = req.body;
        //validar datos
    try{
    const validar = await schema.validateAsync({username: nombre, email: email, password: password})
}
    catch(err){ 
        const {message} = err;
        res.status(400).json({
            error: message
        })
        return;
    }

    //encriptar password
    password = bcrypt.hashSync(password, 10);

    // consulta sql
    await conection.query(`INSERT INTO usuario (NOMBRE, EMAIL, PASSWORD) VALUES('${nombre}', '${email}', '${password}');`, (err, rows) =>{
        if(err){
            const {sqlMessage: error} = err
            res.status(400).json({msj:'error en la consulta a la base de datos: ', error});
            conection.end();
        }
        else res.json({msj: 'usuario creado satisfactoriamente'});
        conection.end();
    })
 




})












const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})






module.exports = ruta;