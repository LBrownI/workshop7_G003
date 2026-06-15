const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');



// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');
        console.log('MongoDB conectado!!');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

// TODO
const UserSchema = new Schema({
    name: { type: String, required: [true, 'el nombre es obligatorio'] },
    email: { type: String, required: [true, 'requiere email'] }
});

// Crear el modelo
const User = model('User', UserSchema);


module.exports = { User };
