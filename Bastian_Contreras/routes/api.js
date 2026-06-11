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
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        // Por simplicidad, generamos un token sin validar contraseña
        const { email } = req.body;
        
        // Buscar el usuario
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        
        // Generar JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
