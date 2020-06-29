const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    restaurantID: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    cuisineTypes: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
}); 

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;