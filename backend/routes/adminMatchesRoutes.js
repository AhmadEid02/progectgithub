const express = require('express');
const { addMatch, updateMatch, getoneMatch, deleteOneMatch } = require('../controller/AdminMatchesController');


const router = express.Router()


router.post("/add",addMatch)
router.put("/edit/:id",updateMatch)
router.get("/:id",getoneMatch)
router.delete("/:id",deleteOneMatch)

module.exports = router;