const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    AddressLine1: { type: String, require: true },
    postalCode: { type: String, require: true },
    default: { type: Boolean, default: false },
    deliveryInstructions: { type: String, require: false },
    latitude: { type: Number, require: false },
    longitude: { type: Number, require: false },
});

module.exports = mongoose.model('Address', AddressSchema);