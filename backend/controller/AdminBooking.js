const { default: mongoose } = require('mongoose')
const Field = require("../modal/fields")
const User = require('../modal/userModal')

const getAllbooking = async (req, res) => {
    try {
        // Fetch all fields with their bookings
        const fields = await Field.find().populate('bookings.userId', 'name email');

        // Extract and format the bookings from the fields
        const allBookings = fields.flatMap(field => {
            return field.bookings.map(booking => {
                if (!booking.userId) {
                    return null;
                }
                return {
                    fieldId: field._id,
                    fieldName: field.name,
                    userId: booking.userId._id,
                    userName: booking.userId.name,
                    userEmail: booking.userId.email,
                    fieldType:field.FieldType,
                    bookedAt: booking.bookedAt,
                    bookedDate: booking.bookedDate,
                    bookedTime: booking.bookedTime,
                    bookedHours: booking.bookedHours,
                    bookedDuration: booking.bookedDuration,
                    equipment: booking.equipment,
                    referee: booking.referee
                };
            }).filter(booking => booking !== null); // Filter out null bookings
        });

        // Return the bookings as response
        res.status(200).json(allBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { getAllbooking };