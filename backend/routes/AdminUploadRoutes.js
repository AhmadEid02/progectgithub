const multer = require('multer');
const express = require('express');
const router = express.Router()

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/assets/fields');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ filename: req.file.filename });
  });

module.exports = router;