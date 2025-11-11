const express = require('express');
const router = express.Router();

const usuarioModel = require('../model/usuarios.js');

router.get('/obtenerUsuarios', async (req, res) => {
    try {
        const docs = await usuarioModel.find();
        res.send(docs);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send({ message: "Error interno del servidor al obtener los usuarios" })
    }
});

router.post('/registrarUsuario', async (req, res) => {
    try {
        const nuevoUsuario = new usuarioModel(req.body);
        const datosGuardados = await nuevoUsuario.save();

        //Respuesta exitosa
        res.status(201).json({ success: true, data: datosGuardados });
        console.log(res, message);
    } catch (error) {
        console.error("Error en /registrarUsuario: ", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }

})

module.exports = router;