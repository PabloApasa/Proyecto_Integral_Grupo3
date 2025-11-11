//modelo de Datos
const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
    username: String,
    nombre: String,
    apellido: String,
    fechNac: Date,
    estado: Boolean,
    password: String,
    rol: String,
    puntaje: Number
});



module.exports = mongoose.model('usuarios', esquemaUsuario);
