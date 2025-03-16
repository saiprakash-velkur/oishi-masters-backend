const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');
const { createCategory, getAllCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', authenticate, checkRole('Admin'), createCategory);
router.get('/', getAllCategories);

module.exports = router;
