const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-super-secret';

const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'];

            if (!token) {
                return res.status(401).json({ error: 'Token no proporcionado' });
            }

            jwt.verify(token, SECRET_KEY);
            return next();

        } catch (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }
    };
};

module.exports = authorize;