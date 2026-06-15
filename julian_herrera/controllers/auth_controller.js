const jwt = require('jsonwebtoken');

// Secreto para verificar el token JWT (debe coincidir con el de api.js)
const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).json({ error: 'Se necesita un token' });
        }

        try {
            jwt.verify(token, SECRET_KEY);  // era "secret" (undefined) → SECRET_KEY
            return next();                  // un solo next(), sin el duplicado
        } catch (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
    }; 
};
module.exports = authorize;


