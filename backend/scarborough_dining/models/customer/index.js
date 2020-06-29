const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: false
    },
    firstName: {
        type: String,
        required: true,
        unique: false,
        time: true
    },
    middleName: {
        type: String,
        required: false,
        unique: false,
        trime: true
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    address: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    city: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    province: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    postalCode: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    favouriteRestaurantIDs: {
        type: [String],
        required: true,
        unique: false
    },
    ratings: {
        type: Map,
        of: Number,
        required: true,
        unique: false
    }
}, {
    timestamps: true
}); 

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;