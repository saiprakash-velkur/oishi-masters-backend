const Cuisine = require('../models/Cuisine');

// Create Cuisine (Admin only)
exports.createCuisine = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCuisine = await Cuisine.findOne({ name });

        if (existingCuisine) return res.status(400).json({ error: 'Cuisine already exists' });

        const cuisine = new Cuisine({ name });
        await cuisine.save();

        res.status(201).json(cuisine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Cuisines
exports.getAllCuisines = async (req, res) => {
    try {
        const cuisines = await Cuisine.find();
        res.status(200).json(cuisines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
