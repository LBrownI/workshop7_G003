const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mi_base_datos');

        console.log('MongoDB conectado correctamente');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

const UserSchema = new mongoose.Schema({
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };
