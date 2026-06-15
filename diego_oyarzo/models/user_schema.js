const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

// TODO
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };
