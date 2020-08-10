const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Order = require('../order').schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        unique: true,
        default: undefined
    },
    admin: {
        type: Boolean,
        required:true,
        default: false
    },
    ratings: {
        type: Map,
        of: Number,
        unique: false,
        default: ""
    },
    favourites: {
        type: Map,
        of: String,
        unique: false,
        default: ""
    },
    address: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        default: ""
    },
    city: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        default: ""
    },
    province: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        default: ""
    },
    postalCode: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        default: ""
    },
    shoppingCart: {
        type: [Order],
        required: false,
        default: []
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;