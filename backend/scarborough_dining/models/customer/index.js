const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
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
    address: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 5
    },
    city: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    province: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    postalCode: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 6
    }
}, {
    timestamps: true
}); 

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;