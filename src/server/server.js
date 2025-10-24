
const express = require('express');
const app = express();

// endopoint metodos get o post

app.get('/', (req, res) => {
    res.send('Bienvenidos a mi sevidor Backend FPW 2025')
});

// routing

const archivoDB = require('./conection.js')

// midleware

// listening

app.listen(5000, () => {
    console.log('Servidor Node Corriendo PERFECTAMENTE');
});