const express = require('express')
const { signupUser, loginUser, updateUsers } = require('../controller/userController')

const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.put("/updateUsers",updateUsers)

module.exports = router
