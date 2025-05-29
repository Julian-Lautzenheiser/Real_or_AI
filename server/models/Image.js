const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    isAI: { type: Boolean, required: true }, // true if AI-generated, false if human
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema); 