const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    title: { type: String, require: true },
    time: { type: String, require: true },
    imageUrl: { type: String, require: true },
    foods: { type: Array, default: [] },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    owner: { type: String, require: true },
    code: { type: String, require: true },
    logoUrl: { type: String, require: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    ratingCount: { type: String, default: "265" },
    verification: { type: String, default: "Pending", enum: ["Pending", "Verified", "Rejected"] },
    verificationMessage: { type: String, default: "Your Restaurant is under review. We will notify you one it is verified." },
    coords: {
        id: { type: String, require: true },
        latitude: { type: Number, require: true },
        longitude: { type: Number, require: true },
        latitudeDelta: { type: Number, default: 0.0112 },
        longitudeDelta: { type: Number, default: 0.0112 },
        address: { type: String, require: true },
        title: { type: String, require: true },
    },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);