const express = require('express');
const router = express.Router();
const User = require('../model/User'); 


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        
        res.status(200).json({ message: 'Login exitoso', role: user.isAdmin ? 'admin' : 'user' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

module.exports = router;
