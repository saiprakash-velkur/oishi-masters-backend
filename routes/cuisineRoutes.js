const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');
const { createCuisine, getAllCuisines } = require('../controllers/cuisineController');

const router = express.Router();

router.post('/', authenticate, checkRole('Admin'), createCuisine);
router.get('/', getAllCuisines);

module.exports = router;
