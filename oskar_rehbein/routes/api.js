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
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log('No se logro ejecutar el try')
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        const {name, email} = req.body;

        const usuarioTarea =  new User({
            name: name,
            email: email
        });

        await usuarioTarea.save();
        console.log('El usuario ha sido creado')
        res.status(201).json({ usuarioTarea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        const {name, email} = req.body;
        const payload = {
            usuarioTarea_nombre: name,
            usuarioTarea_email: email
        }

        const token = jwt.sign (payload, SECRET_KEY, {expiresIn: '4h'})

        res.status(200).json({ 
            msg: 'Se ha logrado general el token!',
            token: token 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
