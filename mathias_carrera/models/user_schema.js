const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('Conexión a MongoDB establecida');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

// TAREA 1: Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Crear el modelo de usuario
const User = mongoose.model('User', UserSchema);

module.exports = { User };