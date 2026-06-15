const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user_schema');
const authorize = require('../controllers/auth_controller');

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
        await newUser.save();
        res.status(201).json({ mensaje: 'Usuario fue creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        
        if (usuario === 'manuel' && password === '123456') {
            const token = jwt.sign(
                { usuario: 'manuel', roles: ['admin'] }, 
                SECRET_KEY, 
                { expiresIn: '1h' }
            );

            res.json({ 
                mensaje: 'Login exitoso', 
                token: token 
            });
        } else {
            res.status(401).send('Usuario o contraseña son incorrectos');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;