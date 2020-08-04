const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    restaurantId: {
        type: String,
        unique: true
    },
    admin: {
        type: Boolean,
        required:true
    },
    ratings: {
        type: Map,
        of: Number,
        required: true,
        unique: false,
        default: ""
    },
    favourites: {
        type: Map,
        of: String,
        required: true,
        unique: false,
        default: ""
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;