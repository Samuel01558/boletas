const express = require('express');
const router = express.Router();
const Evento = require('../model/Evento'); // Asegúrate de que este modelo exista

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
    const { nombre, fecha } = req.body;

    if (!nombre || !fecha) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevoEvento = new Evento({ nombre, fecha });
        await nuevoEvento.save();
        res.status(201).json(nuevoEvento);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Actualizar un evento
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha } = req.body;

    try {
        const eventoActualizado = await Evento.findByIdAndUpdate(id, { nombre, fecha }, { new: true });
        res.json(eventoActualizado);
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Eliminar un evento
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Evento.findByIdAndDelete(id);
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
