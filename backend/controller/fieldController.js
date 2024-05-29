const { default: mongoose } = require('mongoose')
const Field = require("../modal/fields")

const getAllFields = async (req, res) => {
    try {
        const fields = await Field.find().sort({ createdAt: -1 })
        res.status(200).json(fields)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const AddOneFields = async (req, res) => {
    try {
        const newField = await Field.create(req.body);
        res.status(201).json(newField);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getOneField= async (req,res)=>{
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json("no such field")
        }
        const field = await Field.findById(id)
        if (!field) {
            return res.status(404).json("no such field")
        }
        res.status(200).json(field)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateFields = async (req, res) => {
    try {
        const fields = await Field.find({});

        fields.forEach(async (field) => {
            let modified = false;

            field.bookings.forEach((booking) => {
                if (!booking.bookedDuration) {
                    booking.bookedDuration = 60;
                    modified = true;
                }
            });

            if (modified) {
                await field.save();
            }
        });

        console.log('All bookings updated successfully.');
        res.status(200).send('All bookings updated successfully.');
    } catch (error) {
        console.error('Error updating bookings:', error);
        res.status(500).send('Error updating bookings:', error);
    }
};
  const updateFieldsImagesArray = async (req, res) => {
    try {
        const { id, imagesArray } = req.body; // Assuming imagesArray is provided in the request body
        if (!id || !imagesArray) {
            return res.status(400).send('ID and imagesArray are required');
        }

        const field = await Field.findById(id);
        if (!field) {
            return res.status(404).send('Field not found');
        }

        field.imagesArray = imagesArray;
        //field.imagesArray.push(...newImages); add to image array
        
        await field.save();

        console.log('The document updated successfully.');
        res.status(200).send('The document updated successfully.');
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllBookingsForField = async (req, res) => {
    try {
        const { fieldId } = req.params; // Assume fieldId is passed as a URL parameter

        // Fetch the field with its bookings
        const field = await Field.findById(fieldId).populate('bookings.userId', 'name email');
        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        // Initialize a map to store bookings by date
        const bookingsByDate = new Map();

        // Iterate through the bookings of the field
        field.bookings.forEach(booking => {
            if (!booking.userId) {
                return;
            }

            const bookingDate = booking.bookedDate.toISOString().split('T')[0]; // Extract the date part
            const bookedHour = booking.bookedTime;

            // Add the initial booked hour
            if (!bookingsByDate.has(bookingDate)) {
                bookingsByDate.set(bookingDate, new Set());
            }
            bookingsByDate.get(bookingDate).add(bookedHour);

            // If duration is 120 minutes, add the next hour
            if (booking.bookedDuration === 120) {
                const bookedHourInt = parseInt(bookedHour.split(":")[0], 10);
                const nextHour = (bookedHourInt + 1).toString().padStart(2, '0') + ":00";
                bookingsByDate.get(bookingDate).add(nextHour);
            }
        });

        // Convert the map to an array of objects for the response
        const formattedBookings = Array.from(bookingsByDate.entries()).map(([date, hours]) => ({
            date,
            bookedHours: Array.from(hours).sort()
        }));

        // Return the formatted bookings as response
        res.status(200).json(formattedBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    getAllFields,
    AddOneFields,
    getOneField,
    updateFields,
    updateFieldsImagesArray,
    getAllBookingsForField
}