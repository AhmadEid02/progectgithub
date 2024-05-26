const express = require('express');
const { getAllMatches, getMatchesByType } = require('../controller/userMatchesController');

const router = express.Router()



router.get("/",getAllMatches)
router.get("/:sport",getMatchesByType)

module.exports = router;