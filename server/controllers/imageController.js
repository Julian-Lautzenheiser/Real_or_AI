const Image = require('../models/Image');

// Controller for handling getting a random image
exports.getRandomImage = async (req, res) => {
    try {
        const count = await Image.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: "No images found" });
        }

        const randomIndex = Math.floor(Math.random() * count);
        const randomImage = await Image.findOne().skip(randomIndex).select('-isAI');
        if (!randomImage) {
            return res.status(404).json({ message: "No image found at the random index" });
        }
        res.json(randomImage);
    }
    catch(error) {
        console.error("Error fetching random image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller for handling image guess submission
exports.submitGuess = async (req, res) => {
    const { imageId, guess } = req.body;

    if (!imageId || typeof guess !== 'boolean') {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        const isCorrect = (image.isAI === guess);
        res.json({ isCorrect, image });
    }
    catch(error) {
        console.error("Error submitting guess:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller for handling image upload (AI or human)
exports.uploadImage = async (req, res) => {
    const { url, isAI } = req.body;

    if (!url || typeof isAI !== 'boolean') {
        return res.status(400).json({ message: "Invalid request data" });
    }

    // Check if image already exists
    const existingImage = await Image.findOne({ url });
    if (existingImage) {
        return res.status(409).json({ message: "Image already exists" });
    }

    try {
        const newImage = new Image({ url, isAI });
        await newImage.save();
        res.status(201).json(newImage);
    }
    catch(error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};