const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.models.Evento || mongoose.model('Evento', eventoSchema);