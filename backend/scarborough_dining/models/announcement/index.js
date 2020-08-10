const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantAnnouncementSchema = new Schema({
    restaurantID: {
        type: Schema.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}); 

const Announcement = mongoose.model('Announcement', restaurantAnnouncementSchema);

module.exports = Announcement;