const mongoose = require('mongoose');
const server = '127.0.0.1:27017'
const database = 'taller7_db'

// TAREA 1: Configurar MongoDB (Mongoose)
const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`)
        console.log('Conectado con exito');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
});

// Crear el modelo
const User = mongoose.model('User', UserSchema);

//const insertar = async () => {
//    await User.deleteMany({});
//    await User.create({ name: 'Oskar', email: 'correooskar@gmail.com'});
//}

const main = async => {
    conectarDB()
    // insertar()
}

main()

module.exports = { User };
