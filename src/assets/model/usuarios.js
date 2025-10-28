/*
const express = require('express');
const routes = express.Router();

//modelo de Datos
const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
    username: String,
    password: String,
    rol: String,
    name: String,
});

const listaUsuarios = moongose.model{'user', esquemaUsuario};

//rutas, endopoints
//promesa
//routes.get('/obtenerUsuarios', (req, res) => {
    //obtener sitios
    //listaUsuarios.find({}.then(docs) => {
        //res.send(docs)
    //}).catch(err => {
        //res.send(err)
    //})
//})

routes.get('/obtenerUsuarios', async (req, res) => {
    try {
        const docs = await listaUsuarios.find();
        res.send(docs);
    } catch (err) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send({message: 'Error al obtener usuarios', error: error});
    }
});

module.exports = routes;*/
