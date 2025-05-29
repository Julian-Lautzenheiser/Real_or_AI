const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// GET /api/images/random - Get a random image
router.get('/random', imageController.getRandomImage);

// POST /api/images/guess - Submit a guess for an image
router.post('/guess', imageController.submitGuess);

// POST /api/images/upload - Upload a new image (AI or human)
router.post('/upload', imageController.uploadImage);


module.exports = router;