const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        try {
            if (!token) {
                return res.status(401).json({ error: 'Token no proporcionado' });
            }
            
            // Verificar y decodificar el token
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            return next();

        } catch (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
    };
};

module.exports = authorize;
