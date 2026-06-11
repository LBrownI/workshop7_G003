const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { User } = require('../models/user_schema');

const authorize = require('../controllers/auth_controller');

// Secreto para firmar el token JWT
const SECRET_KEY = 'your-super-secret';

// TAREA 2: Implementar Operación GET
router.get('/users', async (req, res) => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
router.post('/users', authorize([]), async (req, res) => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {

    const token = jwt.sign({ userId: '12345' }, SECRET_KEY, { expiresIn: '1h' });

    try {
        const verified = jwt.verify(token, secret)
        console.log('Token válido, acceso autorizado', verified)
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});

module.exports = router;
