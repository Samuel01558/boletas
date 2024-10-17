// api/eventos.js
const express = require('express');
const router = express.Router();
const Evento = require('../model/Evento');

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos' });
    }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
    const { title, description, date, price } = req.body;

    try {
        const newEvento = new Evento({ title, description, date, price });
        await newEvento.save();
        res.status(201).json(newEvento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear evento', error: error.message });
    }
});

// Actualizar evento
router.put('/:id', async (req, res) => {
    const { title, description, date, price } = req.body;
    try {
        const updatedEvento = await Evento.findByIdAndUpdate(req.params.id, { title, description, date, price }, { new: true });
        res.json(updatedEvento);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
    }
});

// Eliminar evento
router.delete('/:id', async (req, res) => {
    try {
        await Evento.findByIdAndDelete(req.params.id);
        res.json({ message: 'Evento eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
    }
});

module.exports = router;
