const User = require('../modal/userModal')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { default: mongoose } = require('mongoose')
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}
const signupUser = async (req, res) => {
    try {
        const { name,email, password } = req.body
        const exist = await User.findOne({ "email": email })
        if (exist) {
            throw Error('Email already in use')
        } else {
            salt = await bcrypt.genSalt(10)
            hash = await bcrypt.hash(password, salt)
            newUser = await User.create({ name,email, password: hash })
            const token = createToken(newUser._id)
            res.status(200).json({ name,email, token })
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const exist = await User.findOne({ "email": email })
        if(exist){
            const match=await bcrypt.compare(password,exist.password)
            if(match){
            const token = createToken(exist._id)
            res.status(200).json({name: exist.name,email, token})
            }else throw Error('wrong password or email address')
        }else{
            throw Error('wrong email address')
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const updateUsers = async (req, res) => {
    try {
        const users = await User.find({});

        users.forEach(async (user) => {
            let modified = false;

            user.bookedFields.forEach((bookedField) => {
                if (!bookedField.bookedDuration) {
                    bookedField.bookedDuration = 60;
                    modified = true;
                }
            });

            if (modified) {
                await user.save();
            }
        });

        console.log('All user bookings updated successfully.');
        res.status(200).send('All user bookings updated successfully.');
    } catch (error) {
        console.error('Error updating user bookings:', error);
        res.status(500).send('Error updating user bookings:', error);
    }
};
module.exports = {
    signupUser,loginUser,updateUsers
}