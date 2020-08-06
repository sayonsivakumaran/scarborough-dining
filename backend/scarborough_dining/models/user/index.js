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
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;