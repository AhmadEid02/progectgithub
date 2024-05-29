const { default: mongoose } = require('mongoose')
const Field = require("../modal/fields")
const User = require('../modal/userModal')

const createBooking = async (req, res) => {
    try {
        const { fieldId, bookedDate, bookedTime, equipment, referee, bookedDuration } = req.body;
        const userId = req.user._id;

        // Check if the field exists
        const field = await Field.findById(fieldId);
        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        // Check if the time slot is available
        const isSlotAvailable = !field.bookings.some(booking => {
            return (
                booking.bookedDate.toISOString() === new Date(bookedDate).toISOString() &&
                booking.bookedTime === bookedTime
            );
        });

        if (!isSlotAvailable) {
            return res.status(400).json({ message: 'Time slot not available' });
        }

        // If bookedDuration is 120, check if all slots within the duration are available
        if (parseInt(bookedDuration) === 120) {
            const bookedTimeHour = parseInt(bookedTime.split(":")[0]);
            for (let i = 0; i < 2; i++) { // Iterate over the next two hours
                const currentHourTime = `${bookedTimeHour + i}:00`;
                const isHourAvailable = !field.bookings.some(booking => {
                    return (
                        booking.bookedDate.toISOString() === new Date(bookedDate).toISOString() &&
                        booking.bookedTime == currentHourTime
                    );
                });

                if (!isHourAvailable) {
                    return res.status(400).json({ message: 'One of the time slots within the booked duration is not available' });
                }
            }
        }

        // Prepare booking details
        const bookingDetails = {
            fieldId,
            bookedDate,
            bookedTime,
            bookedDuration,
            equipment,
            referee,
        };

        // Update user's bookedFields
        await User.findByIdAndUpdate(userId, {
            $push: { bookedFields: bookingDetails },
        });

        // Update field's bookings
        await Field.findByIdAndUpdate(fieldId, {
            $push: { bookings: { userId, ...bookingDetails } },
        });

        res.status(201).json({ bookedDate, bookedTime });
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
                "fieldId": e.fieldId,"bookedTime": e.bookedTime, "bookedDate": formattedDate,"book_id": e._id,"bookedDuration": e.bookedDuration, "fieldData": {
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
const modifyBooking = async (req, res) => {
    try {
        const { bookingId, newBookedDate, newBookedTime, newBookedDuration } = req.body;
        const userId = req.user._id;

        // Validate the new booking date (should be at least the next day)
        const today = new Date();
        const newBookingDate = new Date(newBookedDate);
        if (newBookingDate <= today.setDate(today.getDate() + 1)) {
            return res.status(400).json({ message: 'New booking must be at least for the next day' });
        }

        // Find the user and the booking
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const booking = user.bookedFields.id(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if the field exists
        const field = await Field.findById(booking.fieldId);
        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        // Check if the new time slot is available
        const newBookedTimeHour = parseInt(newBookedTime.split(":")[0]);
        const isSlotAvailable = !field.bookings.some(booking => {
            return (
                booking.bookedDate.toISOString() === newBookingDate.toISOString() &&
                (booking.bookedTime === newBookedTime ||
                    (parseInt(booking.bookedTime.split(":")[0]) === newBookedTimeHour + 1 && newBookedDuration == 120))
            );
        });

        if (!isSlotAvailable) {
            return res.status(400).json({ message: 'New time slot not available' });
        }

        // Find the corresponding booking in the field
        const fieldBooking = field.bookings.find(b => 
            b.userId.equals(userId) &&
            b.bookedDate.toISOString() === booking.bookedDate.toISOString() &&
            b.bookedTime === booking.bookedTime
        );

        if (!fieldBooking) {
            return res.status(404).json({ message: 'Field booking not found' });
        }

        // Update the booking for user
        booking.bookedDate = newBookedDate;
        booking.bookedTime = newBookedTime;
        booking.bookedDuration = newBookedDuration;
        await user.save();

        // Update the booking for field
        fieldBooking.bookedDate = newBookedDate;
        fieldBooking.bookedTime = newBookedTime;
        fieldBooking.bookedDuration = newBookedDuration;
        await field.save();

        res.status(200).json({ message: 'Booking updated successfully', newBookedDate, newBookedTime });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

// Export the modifyBooking method
module.exports = { createBooking, getBooked, modifyBooking };
