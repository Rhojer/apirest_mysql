const express = require('express');
const ruta = express.Router();
const validarToken = require('../middleware/auth.js')
const conection = require('../config/conectSQL.js');

ruta.post('/', validarToken, async(req,res) =>{
    const {nombre, descripcion } = req.body;
    if(req.usuario.profesor = true){
        await crearCurso(nombre, descripcion);
    }

});









 function crearCurso(nombre, descripcion){
    conection.query(`SELECT * FROM curso WHERE nombre = '${nombre}'`, (err, rows) =>{
        console.log(rows.length)
        if(rows.length = 1){
           res.json({msj:'curso ya existente'})
       }else{
           conection.query(`INSERT (NOMBRE, DESCRIPCION, AUTOR) INTO curso(${nombre},${descripcion}, ${req.usuario.id})`, (err, rows) => {
               if(!err){
                   res.json({
                       msj:'curso creado satisfactoriamente',rows
                   })
               }else{
                   res.status(400).json({msj:'error insertando datos del curso'})
               }
           })
       }
        
    });
    };



module.exports = ruta;