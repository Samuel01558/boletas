// api/Login.js
const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario'); 


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const user = await Usuario.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
});

module.exports = router; 
