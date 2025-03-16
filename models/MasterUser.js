const mongoose = require('mongoose');

const masterUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    DoB: { type: Date, required: true },
    email: { type: String, required: false, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    brandName: { type: String },
    brandLink: { type: String },
    cuisines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    additionalDetails: { type: Object, default: {} },
    emailVerified: { type: Boolean, default: true },
    mobileVerified: { type: Boolean, default: true },
    role: { type: String, enum: ['Admin', 'Master'], default: 'Master' }
}, { timestamps: true });

module.exports = mongoose.model('MasterUser', masterUserSchema);
