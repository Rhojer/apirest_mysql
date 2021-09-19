const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('config');

const validarToken = (req, res, next) =>{
        try {
        const token = fs.readFileSync('config/token.txt',{encoding:'utf8', flag:'r'})
        jwt.verify(token , config.get('configToken.SEED'), (err, decoded) =>{
            if(err){
                return res.status(401).json({
                    msj: 'error de conexion usuario', err
                });
            }
            req.usuario = decoded.datausuario;
            
        })
    }catch(err){
        res.json({err: err})
    }

   
    next();
}

module.exports = validarToken;