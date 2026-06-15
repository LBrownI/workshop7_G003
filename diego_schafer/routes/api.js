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
        // Obtener todos los usuarios
        const usuarios = await User.find();
        
        // Retornar los documentos en formato JSON
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 3 y 5: Implementar Operación POST y proteger con middleware
router.post('/users', authorize(['admin']), async (req, res) => {
    try {
        // Capturar name y email desde el body de la petición
        const { name, email } = req.body;

        // Insertar el nuevo usuario en MongoDB
        const nuevoUsuario = await User.create({ name, email });
        
        // Retornar el usuario creado
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// TAREA 4: Generación de Token (Login)
router.post('/login', async (req, res) => {
    try {
        // Crear un payload simulado
        const payload = { userId: '12345', email: 'test@test.com' };
        
        // Generar el token firmado con la clave secreta y le damos expiración
        const token = jwt.sign(payload, SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });

        // Retornar el token al cliente en un JSON
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;