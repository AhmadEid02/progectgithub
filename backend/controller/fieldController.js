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


module.exports = {
    getAllFields,
    AddOneFields,
    getOneField,
    updateFields,
    updateFieldsImagesArray
}