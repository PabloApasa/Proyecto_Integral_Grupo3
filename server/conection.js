
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://apasapablo_db_user:apasapablo@tudivj.91nh0vf.mongodb.net/TUDIVJ?appName=TUDIVJ")


const objeto = mongoose.connection;

objeto.on('connected', () => {
    console.log('Conectado a la BD MOngo FPW 2025...');
});
objeto.on('error', () => {
    console.log('Se produjo un error en la conexion con Mongo DB')
});

module.exports = mongoose;

