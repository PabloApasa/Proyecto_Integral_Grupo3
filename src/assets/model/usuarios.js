
const express = require('express');
const router = express.Router();

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
    puntaje: Number,
});

const listaUsuarios = mongoose.model('usuarios', esquemaUsuario);

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

router.get('/obtenerUsuarios', async (req, res) => {
    try {
        const docs = await listaUsuarios.find();
        res.send(docs);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send({ message: 'Error al obtener usuarios', error: error });
    }
});

// post: funcion asincrona, req:requerimiento

router.post('/registarUsuario', async (req, res) => {
    try {
        const nuevoUsuario = new usuarioModel (req.body);
        const datosGuardados = await nuevoUsuario.save();

        // Respuesta exitosa

        res.status(201).json({ success: true, data datosGuardados});
        console.log(res.massage);

    } catch (error) {
        console.error('Error en /registrarUsuario', error);
        res.status(500).send({ message: 'Error al obtener usuarios', error: error });
    }
});

module.exports = router;
