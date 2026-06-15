const jwt = require('jsonwebtoken');

// Secreto para verificar el token JWT (debe coincidir con el de api.js)
const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            // Extraer el token de los headers
            const token = req.headers["x-access-token"];

            // Si no hay token, rechazar la petición
            if (!token) {
                return res.status(403).json({ error: "Se necesita un token para autentificar" });
            }

            // Verificar el token usando jwt.verify() y la clave secreta
            const decoded = jwt.verify(token, SECRET_KEY);

            // Si el token es válido, permitimos que la petición continúe
            return next();

        } catch (err) {
            // Si el token es inválido o expiró, la función jwt.verify() arrojará un error 
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
    };
};

module.exports = authorize;