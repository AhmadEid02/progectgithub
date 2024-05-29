const express = require('express');
const { adminLogin, adminCreateAccount } = require('../controller/AdminAccount');

const router = express.Router()

router.post("/signup",adminCreateAccount)
router.post("/login",adminLogin)

module.exports = router