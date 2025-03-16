const express = require('express');
const { signup, verifyOtp, signin, completeSignIn } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/get-signin-otp', signin);
router.post('/verify-signin-otp', completeSignIn)

module.exports = router;
