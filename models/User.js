const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    otp: { type: String, require: false, default: "none" },
    fcm: { type: String, require: false, default: "none" },
    password: { type: String, require: true },
    verification: { type: Boolean, default: false },
    phone: { type: String, default: "0123456789" },
    phoneVerification: { type: Boolean, default: false },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        require: false,
    },
    userType: { type: String, require: true, default: "Client", enum: ['Client', 'Admin', 'Vendor', 'Driver'] },
    profile: { type: String, default: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg' },
}, { timeseries: true });

module.exports = mongoose.model('User', UserSchema);