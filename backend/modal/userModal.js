const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
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
        bookedDuration: Number,
        bookedAt: {
            type: Date,
            default: Date.now,
        },
        equipment: [{ equipmentType: String, equipmentPrice: Number }],
        referee: { refereeName: String, refereeCost: Number },
        
    },{timestamps: true}]
}, { timestamps: true })
module.exports = mongoose.model('SACUser', userSchema)
