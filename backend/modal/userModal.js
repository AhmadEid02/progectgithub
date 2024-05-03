const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    , bookedFields: [{
        fieldId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SACField1',
            required: true,
        }, bookedDate: Date,
        bookedTime: String,
        bookedHours: [String],
        bookedAt: {
            type: Date,
            default: Date.now,
        }
    }]
}, { timestamps: true })
module.exports = mongoose.model('SACUser', userSchema)
