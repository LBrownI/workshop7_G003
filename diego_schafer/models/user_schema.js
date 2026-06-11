const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        // TODO
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('MongoDB conectado exitosamente!!');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

// Definir el esquema con los campos requeridos
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'] 
    }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };
