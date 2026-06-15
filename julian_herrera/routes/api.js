const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models/user_schema');
const authorize = require('../controllers/auth_controller');

const SECRET_KEY = 'your-super-secret';

// TAREA 2: GET /users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 + 5: POST /users protegido con JWT
router.post('/users', authorize([]), async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: POST /login — solo genera y devuelve el token
router.post('/login', (req, res) => {
    try {
        const token = jwt.sign({ userId: '12345' }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;