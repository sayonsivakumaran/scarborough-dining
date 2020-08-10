const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let MenuItem = require('../menu_item').schema;
let Order = require('../order').schema;

let Announcement = require('../announcement').schema;

const restaurantSchema = new Schema({
    ownerID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ratings: {
        type: [Number],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    logoURL: {
        type: String,
        required: true
    },
    introVideoURL: {
        type: String,
        required: false
    },
    imageURLs: {
        type: [String],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
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
    cuisineTypes: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    yearEstablished: {
        type: String,
        required: false
    },
    menuItems: {
        type: [MenuItem],
        default: []
    },
    announcements: {
        type: [Announcement],
        required: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    orderRequests: {
        type: [[Order]],
        default: []
    }
}, {
    timestamps: true
}); 

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;