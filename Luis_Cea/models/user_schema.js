const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Conexión a la base de datos
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('Conexión a MongoDB exitosa');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };