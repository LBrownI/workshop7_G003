const jwt = require('jsonwebtoken');

// El secreto debe ser exactamente el mismo que usamos en api.js para firmar
const SECRET_KEY = 'your-super-secret';

// TAREA 5: Proteger Ruta con Autorización
const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            // 1. Extraer el token de los headers (x-access-token)
            const token = req.headers['x-access-token'];

            // 2. Si no hay token, rechazamos la petición
            if (!token) {
                return res.status(403).json({ error: 'Acceso denegado: No se proporcionó un token' });
            }

            // 3. Verificar que el token sea válido y no haya expirado
            jwt.verify(token, SECRET_KEY);

            // 4. Si todo está correcto, dejamos pasar la petición a la ruta POST
            return next();
        } catch (err) {
            // Si jwt.verify falla (token falso o expirado), cae en este catch
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
    };
};

module.exports = authorize;