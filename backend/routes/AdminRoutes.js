const express = require('express');
const { updateField } = require('../controller/AdminField');
const router = express.Router()

router.put("/updatefield/:id",updateField)

module.exports = router;