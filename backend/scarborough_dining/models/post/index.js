const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    posterGoogleId: {
        type: String,
        required: true
    },
    restaurantId : {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageURLs: {
        type: [String],
        required: false
    },
},
{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;