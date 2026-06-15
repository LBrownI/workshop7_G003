const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'taller7_db';
// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');

        console.log('MongoDB conectado');
        // TODO
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

// TODO
const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: [true, 'Nombre']},
        email: {type: String, required: [true, 'email']},   
    }
);

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };
