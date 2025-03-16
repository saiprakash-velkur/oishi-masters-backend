const MasterUser = require('../models/MasterUser');
const OTP = require('../models/OTP');
const { sendOtp } = require('../services/otpService');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
require('dotenv').config();

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, DoB, email, mobileNumber, brandName, brandLink, cuisines, categories, additionalDetails, role } = req.body;

        const user = new MasterUser({ name, DoB, email, mobileNumber, brandName, brandLink, cuisines, categories, additionalDetails, role });
        await user.save();

        // Send verification mail and verification otp to mobile number

        res.status(201).json({ message: 'User registered. Verify OTP.', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;
        const validOtp = await OTP.findOne({ mobileNumber, otp });

        if (!validOtp) return res.status(400).json({ error: 'Invalid OTP' });

        await MasterUser.updateOne({ mobileNumber }, { mobileVerified: true });
        await OTP.deleteOne({ mobileNumber });

        res.status(200).json({ message: 'Mobile verified' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Signin
exports.signin = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const user = await MasterUser.findOne({ mobileNumber, mobileVerified: true });

        if (!user) return res.status(400).json({ error: 'User not found or not verified' });

        await sendOtp(mobileNumber);
        res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.completeSignIn = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;
        const validOtp = await OTP.findOne({ mobileNumber, otp });

        if (!validOtp) return res.status(400).json({ error: 'Invalid OTP' });

        if (validOtp.expiresAt < new Date()) throw new Error('OTP expired');
        await OTP.deleteOne({ mobileNumber });
        let user = await MasterUser.findOne({ mobileNumber });

        const token = generateToken(user)
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}