// api/Register.js
const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario'); // Asegúrate de que la ruta al modelo sea correcta

// Endpoint para registro
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        console.error('Error getting eventos:', error);
        res.status(500).json({ message: 'Error getting eventos' });
    }
});

// Create a new evento (boleta)
router.post('/', async (req, res) => {
    const { title, date, description, price } = req.body;

    const nuevoEvento = new Evento({
        title,
        date,
        description,
        price,
    });

    try {
        const eventoGuardado = await nuevoEvento.save();
        res.status(201).json(eventoGuardado);
    } catch (error) {
        console.error('Error creating evento:', error);
        res.status(400).json({ message: 'Error creating evento' });
    }
});

module.exports = router;
