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
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
rrouter.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = new User({
            email,
            password,
            role,
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password, } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({
                error: 'Contraseña invalida'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            mensaje: 'Login exitoso',
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

