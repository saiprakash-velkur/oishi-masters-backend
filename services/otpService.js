const OTP = require('../models/OTP');
const { sendSms } = require('./smsService');
const crypto = require('crypto');

const generateOtp = () => crypto.randomInt(100000, 999999).toString();
exports.sendOtp = async (mobileNumber) => {
    let otp = generateOtp();
    if (process.env.GENERATE_RANDOM_OTP === 'false') {
        otp = "123456";
    }
    const expiresAt = new Date(Date.now() + process.env.OTP_EXPIRY_MINUTES * 60000);

    await OTP.updateOne(
        { mobileNumber },
        { otp, expiresAt },
        { upsert: true }
    );

    const message = `Your OTP is ${otp}. It will expire in ${process.env.OTP_EXPIRY_MINUTES} minutes.`;
    if (process.env.ENABLE_SMS_OTP === 'true') {
        await sendSms(mobileNumber, message);
    }
};
