const express = require('express');
const ruta = express.Router();
const validarToken = require('../middleware/auth.js');
const Joi = require('joi');
const conection = require('../config/conectSQL.js');

ruta.post('/crear', validarToken, (req, res) =>{
    console.log(req.usuario)
    if(req.usuario.rol == 1){
    const {nombre, descripcion } = req.body;
    conection.query(`SELECT * FROM curso WHERE nombre = '${nombre}'`, (err, rows) =>{
        console.log(rows.length)
        if(rows.length == 1){
           return res.json({msj:'curso ya existente'});
       }else{
            conection.query(`INSERT INTO curso(nombre, descripcion, profesor) VALUES('${nombre}','${descripcion}', '${req.usuario.nombre}')`, (err, rows) => {
            
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
}else{
    res.json({
        msj: 'no tiene los permisos necesarios para crear un curso'
    });
}
  /*   if(req.usuario.profesor = true){
        await crearCurso(nombre, descripcion);
    } */

});

ruta.post('/inscribir', validarToken, (req, res) =>{
    conection.query(`SELECT * FROM curso WHERE id = '${req.body.id}' `, (err, rows) => {
        let [{id, nombre}] = rows;
        if(err) return res.status(401).json({msj: 'ocurrio un error:' , err})
        if(rows.length == 1){
            conection.query(`INSERT INTO curso_usuario (curso_id, usuario_id) VALUES ('${id}', '${req.usuario.id}')`, (err) =>{
                if(err){
                     return res.status(400).json ({msj:'error con el servidor', err})
                    }else{
                        res.json({inscripcion: 'ok',
                        msj: `felicidades ${req.usuario.nombre} se ha registrado satisfactoriamente en el curso: ${nombre}`})
                    }
            
            })
        }else {res.status(400).json({msj: 'curso inexistente'})}
    })
       
})







 function crearCurso(nombre, descripcion){
    /* conection.query(`SELECT * FROM curso WHERE nombre = '${nombre}'`, (err, rows) =>{
        console.log(rows.length)
        if(rows.length = 1){
            console.log('no1');
           return res.json({msj:'curso ya existente'});
       }else{
            conection.query(`INSERT (nombre, descripcion, autor) INTO curso('${nombre}','${descripcion}', '${req.usuario.id}')`, (err, rows) => {
            console.log('no');
            if(!err){
                   res.json({
                       msj:'curso creado satisfactoriamente',rows
                   })
               }else{
                   res.status(400).json({msj:'error insertando datos del curso'})
               }
           })
       }
        
    }); */
    };


    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
    
    })
module.exports = ruta;