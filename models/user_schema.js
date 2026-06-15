const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'taller7_db';

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);  
        // TODO
        console.log('MongoDB');
        
    } catch (err) {
        console.log(err);
    }
};
conectarDB();

// TODO
const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'El nombre es obligatorio']},
    email: {type: String, unique: true, required: [true, 'El email es obligatorio']},
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

module.exports = { User };
