const { default: mongoose } = require('mongoose')
const Field = require("../modal/fields")
const User = require('../modal/userModal')

const createBooking = async (req, res) => {
    try {
        const {fieldId, bookedDate, bookedTime , equipment, referee} = req.body;
        const userId = req.user._id;

        // Check if the field exists
        const field = await Field.findById(fieldId);
        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // Check if the time slot is available
        const isSlotAvailable = !field.bookings.some(
            (booking) => {
                return (
                    booking.bookedDate.toISOString() === new Date(bookedDate).toISOString() &&
                    booking.bookedTime === bookedTime
                );
            }
        );

        if (!isSlotAvailable) {
            return res.status(400).json({ message: 'Time slot not available' });
        }

        // Update user's bookedFields
        const bookingDetails = {
            fieldId,
            bookedDate,
            bookedTime,
            equipment,
            referee
        };

        await User.findByIdAndUpdate(userId, {
            $push: { bookedFields: bookingDetails },
        });

        // Update field's bookings
        await Field.findByIdAndUpdate(fieldId, {
            $push: { bookings: { userId, ...bookingDetails } },
        });

        res.status(201).json({ "bookedDate": bookedDate, "bookedTime": bookedTime });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
const getBooked=async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const fields = [];
        const fieldsId = [];
        user.bookedFields.map(e => {
            fieldsId.push(e.fieldId)
        })

        for (const e of user.bookedFields) {
            let f = await Field.findById(e.fieldId)
            const formattedDate = new Date(e.bookedDate).toLocaleDateString();
            fields.push({
                "fieldId": e.fieldId, "bookedTime": e.bookedTime, "bookedDate": formattedDate, "fieldData": {
                    ...f.toObject()
                }
            })

        }
        res.status(201).json(fields);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// Export the booking method
module.exports = { createBooking ,getBooked};