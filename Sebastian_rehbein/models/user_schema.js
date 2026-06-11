const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('Conectado a MongoDB exitosamente');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

// Definir el esquema con name y email obligatorios
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };