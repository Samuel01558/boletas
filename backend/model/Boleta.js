const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    comentarios: [
        {
            username: String,
            comentario: String,
            puntuacion: Number
        }
    ]
});

module.exports = mongoose.model('Boleta', boletaSchema);
