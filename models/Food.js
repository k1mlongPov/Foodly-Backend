const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    title: { type: String, require: true },
    time: { type: String, require: true },
    foodTags: { type: Array, require: true },
    category: { type: String, require: true },
    foodType: { type: Array, require: true },
    code: { type: String, require: true },
    isAvailable: { type: Boolean, default: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, require: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    ratingCount: { type: String, default: '276' },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    additives: { type: Array, default: [] },
    imageUrl: { type: Array, require: true },
});

module.exports = mongoose.model('Food', FoodSchema);