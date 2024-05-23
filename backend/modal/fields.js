const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imagesArray :["String"]
    ,
    description: String,
    FieldType: String,
    capacity: Number,
    pricePerHour: Number,
    features: [String],
    imageUrl: String,
    openingHours: {
        sunday: { start: String, end: String },
        monday: { start: String, end: String },
        tuesday: { start: String, end: String },
        wednesday: { start: String, end: String },
        thursday: { start: String, end: String },
        friday: { start: String, end: String },
        saturday: { start: String, end: String },
    },
    equipment: [
        {
            equipmentType: String, equipmentPrice: Number
        }
    ],
    referee: {
        refereeName: String,
        refereeCost: Number
    },
    bookings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SACUser',
            },
            bookedAt: {
                type: Date,
                default: Date.now,
            },
            bookedDate: Date,
            bookedTime: String,
            bookedHours: [String],
            bookedDuration: Number,
            equipment: [{ equipmentType: String, equipmentPrice: Number }],
            referee: { refereeName: String, refereeCost: Number },
            // timestamps: true,
        },,{timestamps: true}
    ],
}, { timestamps: true });

const SACField = mongoose.model('SACField1', fieldSchema);

module.exports = SACField;
