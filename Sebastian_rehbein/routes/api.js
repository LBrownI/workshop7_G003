const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Importamos el modelo que acabas de crear
const { User } = require('../models/user_schema');
const authorize = require('../controllers/auth_controller');

// Secreto para firmar el token JWT
const SECRET_KEY = 'your-super-secret';

// TAREA 2: Implementar Operación GET 
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware [cite: 45, 48]
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Creamos y guardamos el nuevo usuario en MongoDB
        const newUser = new User({ name, email });
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login) 
router.post('/login', async (req, res) => {
    try {
        // Generamos un token básico que expira en 1 hora 
        const token = jwt.sign({ user: 'usuario_demo' }, SECRET_KEY, { expiresIn: '1h' });
        
        // Retornamos el token al cliente en formato JSON 
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;