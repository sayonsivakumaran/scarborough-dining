const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: false, 
        minlength: 10
    },
    firstName: {
        type: String,
        required: true,
        unique: false,
        time: true,
        minlength: 1
    },
    middleName: {
        type: String,
        required: false,
        unique: false,
        trime: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    restaurantID: {
        type: String,
        required: true,
        unique: true        // TODO: determine if a restaurant can only have a single owner
    }
}, {
    timestamps: true
}); 

const Owner = mongoose.model('Owner', customerSchema);

module.exports = Owner;