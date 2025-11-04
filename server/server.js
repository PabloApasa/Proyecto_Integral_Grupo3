
const express = require('express');
const app = express("mongodb + srv://apasapablo_db_user:apasapablo@tudivj.91nh0vf.mongodb.net/?appName=TUDIVJ");

// endopoint metodos get o post

app.get('/', (req, res) => {
    res.end('Bienvenidos a mi sevidor Backend FPW 2025')
});

// routing

const archivoDB = require('./conection.js')
const usuarios = require('../src/assets/model/usuarios.js')

// midleware

app.use('/api', usuarios);

// listening

app.listen(5000, () => {
    console.log('Servidor Node Corriendo PERFECTAMENTE');
});