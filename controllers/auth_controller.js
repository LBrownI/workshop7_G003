const jwt = require('jsonwebtoken');

// Secreto para verificar el token JWT (debe coincidir con el de api.js)
const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    error: 'Token no proporcionado'
                });
            }

            const token = authHeader.split(' ')[1];

            const decoded = jwt.verify(token, SECRET_KEY);

            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    error: 'No tienes permisos para acceder a este recurso'
                });
            }

            next();

        } catch (err) {
            return res.status(401).json({
                error: 'Token inválido o expirado'
            });
        }
    };
};

module.exports = authorize;
