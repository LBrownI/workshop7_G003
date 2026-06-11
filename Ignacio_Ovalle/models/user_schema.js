const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'taller7_db';
const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log('mongo conectado');
    } catch (err) {
        console.log('Fallo al conectar a MongoDB', err);
    }
};
conectarDB();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
