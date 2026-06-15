const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user_schema');

const authorize = require('../Benjamin_Ojeda/controllers/auth_controller');

// Secreto para firmar el token JWT
const SECRET_KEY = 'your-super-secret';

// TAREA 2: Implementar Operación GET
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({
            name: name,
            email: email
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {return res.status(400).json({ error: 'El correo es obligatorio' });}
        const payload = {email: email, role: 'admin' };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token: token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
