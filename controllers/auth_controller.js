const jwt = require('jsonwebtoken');

// Secreto para verificar el token JWT (debe coincidir con el de api.js)
const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('Se necesita un token');
    }
    try {
        // TODO
        jwt.verify(token, secret);
        next();
        return next();
        
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
};
module.exports = authorize;


