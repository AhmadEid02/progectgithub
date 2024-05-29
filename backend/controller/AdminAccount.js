const { default: mongoose } = require('mongoose')
const admin = require("../modal/AdminModal")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const adminCreateAccount = async (req, res) => {
    try {
        const {  userName, password } = req.body
        const exist = await admin.findOne({ "userName": userName })
        if (exist) {
            throw Error('User Name already in use')
        } else {
            salt = await bcrypt.genSalt(10)
            hash = await bcrypt.hash(password, salt)
            newUser = await admin.create({ userName, password: hash })
            const token = createToken(newUser._id)
            res.status(200).json({ userName, token })
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const adminLogin = async (req, res) => {
    try {
        const {  userName, password  } = req.body
        const exist = await admin.findOne({ "userName": userName })
        if (exist) {
            const match = await bcrypt.compare(password, exist.password)
            if (match) {
                const token = createToken(exist._id)
                res.status(200).json({ userName, token })
            } else throw Error('wrong password or User Name address')
        } else {
            throw Error('wrong user name address')
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { adminCreateAccount, adminLogin };