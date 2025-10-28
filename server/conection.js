
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://fpw-proyecto-final:<db_password>@cluster0.dgphu0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

//mongodb + srv://fpw-proyecto-final:<db_password>@cluster0.dgphu0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const objeto = mongoose.connection;

objeto.on('connected', () => {
    console.log('Conectado a la BD MOngo FPW 2025...');
});
objeto.on('error', () => {
    console.log('Se produjo un error en la conexion con Mongo DB')
});

module.exports = mongoose;

//usuario: fpw-proyecto-final
//password: fpw-proyecto-final 