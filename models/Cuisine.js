const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

module.exports = mongoose.model('Cuisine', cuisineSchema);
