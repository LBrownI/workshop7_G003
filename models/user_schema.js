const mongoose = require('mongoose');

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017/taller7_db');

    try {
        // TODO
        console.log('Se conmpleto la conexión a MongoBB');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    } 
};
conectarDB();

// TODO
const UserSchema = new mongoose.Schema({
    name: { type: String },
    mail: { type: String }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);


module.exports = { User };
