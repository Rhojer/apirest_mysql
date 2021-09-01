const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) =>{
    let token = req.get('autorizacion');
    jwt.verify(token, 'secret', (err, decoded) =>{
        if(err){
            return res.status(401).json({
                msj: 'error de conexion usuario', err
            });
        }
        req.usuario = decoded.datausuario;
        
    })
    next();
}

module.exports = validarToken;