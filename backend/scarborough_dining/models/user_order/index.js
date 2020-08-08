const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    menuItemID: {
        type: Schema.ObjectId,
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
    },
    total: {
        type: Number,
        required: true
    },
    restaurantID: {
        type: Schema.ObjectId,
        required: true
    }
}, {
    timestamps: true
}); 
const UserOrder = mongoose.model('UserOrder', userOrderSchema);

module.exports = UserOrder;