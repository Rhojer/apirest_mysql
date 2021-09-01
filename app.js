const express = require('express');
const { env } = require('process');
const usuario = require('./routes/usuarios.js');
const auth = require('./routes/auth.js');
const curso = require('./routes/cursos.js');
//analizador del body
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

process.env.TOKEN = 0;

// conectar con rutas..
app.use('/api/usuario', usuario);
app.use('/api/auth', auth);
app.use('/api/cursos', curso);






//conectar con el puerto
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log('listen port: '+ port)
})