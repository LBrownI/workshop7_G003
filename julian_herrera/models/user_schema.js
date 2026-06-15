const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('Conexión a MongoDB exitosa');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
        process.exit(1);
    }
}
conectarDB();

// TODO
const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);


module.exports = { User };
