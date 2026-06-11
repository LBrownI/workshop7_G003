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
        const collections= User.collection;
        res.json({collectionname: collections.name})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        User.insertOne({name: name, email: email})
        res.status(200).json({message: 'ok'})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        const token = await jwt.sign({ userId: '12345' }, SECRET_KEY, { expiresIn: '1h' })
        res.json({token: token})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
