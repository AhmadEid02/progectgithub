const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    newsDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    newsType: {
        type: String,
        required: true,
        enum: ['Football', 'Basketball', 'Tennis', 'Squash', 'Volleyball', 'Other'] // Enum for different sports types
    },
    topics: {
        type: [String], // Array of strings for topics
        required: true
    },
    disable: {
        type: Boolean,
        default: false // By default, news is visible
    }
}, { timestamps: true });


const NewsSAC = mongoose.model('NewsSAC', newsSchema);

module.exports = NewsSAC;