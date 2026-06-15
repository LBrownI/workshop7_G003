const mongoose = require('mongoose');

const server = "127.0.0.1:27017"
const database = "taller7_db"

// TODO
const UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, required: [true, 'el email es obligatorio'] }
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);



// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`)
        console.log('Conectado a la base de datos correctamente');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

module.exports = { UserSchema, User };


