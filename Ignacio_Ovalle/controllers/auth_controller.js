const jwt = require('jsonwebtoken');

// Secreto para verificar el token JWT (debe coincidir con el de api.js)
const SECRET_KEY = 'your-super-secret';

const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'];

            if (!token) {
                return res.status(401).json({ error: 'Token requerido' });
            }

            const payload = jwt.verify(token, SECRET_KEY);
            req.user = payload;

            return next();

        } catch (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
    };
};

module.exports = authorize;
