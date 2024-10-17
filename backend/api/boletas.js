const express = require('express');
const router = express.Router();
const Boleta = require('../model/boleta'); 


router.get('/', async (req, res) => {
    try {
        const boletas = await Boleta.find(); 
        res.json(boletas); 
    } catch (error) {
        console.error('Error al obtener boletas:', error);
        res.status(500).json({ message: 'Error al obtener las boletas' });
    }
});

// Crear una nueva boleta
router.post('/', async (req, res) => {
    const { title, date, location, description, price } = req.body;

    const nuevaBoleta = new Boleta({
        title,
        date,
        location,
        description,
        price,
    });

    try {
        const boletaGuardada = await nuevaBoleta.save(); 
        res.status(201).json(boletaGuardada); 
    } catch (error) {
        console.error('Error al crear boleta:', error);
        res.status(400).json({ message: 'Error al crear la boleta' });
    }
});

module.exports = router; 
