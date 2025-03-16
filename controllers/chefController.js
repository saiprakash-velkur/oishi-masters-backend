const MasterUser = require('../models/MasterUser');

// Fetch Chef Profile (Self or Admin)
exports.getChefProfile = async (req, res) => {
    try {
        const { user } = req;
        const { chefId } = req.params;

        if (user.role !== 'Admin' && user._id.toString() !== chefId) {
            return res.status(403).json({ error: 'Access Denied' });
        }

        const chef = await MasterUser.findById(chefId).populate('cuisines categories');
        if (!chef) return res.status(404).json({ error: 'Chef not found' });

        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Chef Profile
exports.updateChefProfile = async (req, res) => {
    try {
        const { user } = req;
        const { chefId } = req.params;

        if (user.role !== 'Admin' && user._id.toString() !== chefId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const updatedChef = await MasterUser.findByIdAndUpdate(chefId, req.body, { new: true });
        if (!updatedChef) return res.status(404).json({ error: 'Chef not found' });

        res.status(200).json(updatedChef);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
