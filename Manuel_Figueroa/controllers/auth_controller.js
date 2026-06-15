const jwt = require('jsonwebtoken');

// Secreto para verificar el token JWT (debe coincidir con el de api.js)
const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'];
            if (!token) {
                return res.status(401).json({error:'token no fue proporcionado'});
            }

            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            
            return next();

        } catch (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }
    };
};

module.exports = authorize;