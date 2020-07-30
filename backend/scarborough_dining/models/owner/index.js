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
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
    restaurantID: {
        type: String,
        required: true,
        unique: true        // TODO: determine if a restaurant can only have a single owner
    },
    verified: {
        type: Boolean,
        required: true,
        unique: true,
        default: false
    }
}, {
    timestamps: true
}); 

const Owner = mongoose.model('Owner', customerSchema);

module.exports = Owner;