const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user_schema');

const authorize = require('../controllers/auth_controller');

// Secreto para firmar el token JWT
const SECRET_KEY = 'your-super-secret';

// TAREA 2: Implementar Operación GET
router.get('/users', async (req, res) => {
    try {
        // TODO
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.get('/login', (req, res) => {
    res.status(405).json({
        error: 'Usa POST /api/login para obtener el token JWT',
    });
});

router.post('/login', async (req, res) => {
    try {
        const payload = { userId: '123' };
        const token = jwt.sign(payload, SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
