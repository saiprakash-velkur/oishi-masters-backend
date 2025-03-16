exports.sendSms = async (mobileNumber, message) => {
    console.log(`Sending SMS to ${mobileNumber}: ${message}`);
    // Use Twilio, Nexmo, or another SMS provider for production
    try {
        const response = await axios.post(process.env.SMS_GATEWAY_URI, {
            apiKey: process.env.SMS_API_KEY,
            senderId: process.env.SMS_SENDER_ID,
            to: mobileNumber,
            message,
        });
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};
