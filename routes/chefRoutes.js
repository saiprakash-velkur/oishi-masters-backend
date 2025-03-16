const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { getChefProfile, updateChefProfile } = require('../controllers/chefController');

const router = express.Router();

router.get('/:chefId', authenticate, getChefProfile);
router.put('/:chefId', authenticate, updateChefProfile);

module.exports = router;
