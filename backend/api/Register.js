const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario'); // Asegúrate de que esto esté correcto

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Verifica si todos los campos requeridos están presentes
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verifica si el usuario ya existe
        const existingUser = await Usuario.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crea un nuevo usuario
        const newUser = new Usuario({
            username,
            email,
            password
        });

        // Guarda el nuevo usuario en la base de datos
        await newUser.save();
        res.status(201).json({ message: 'Registro exitoso' });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

module.exports = router;
