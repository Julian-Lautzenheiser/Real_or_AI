// server/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // For serving static files

const imageRoutes = require('./routes/imageRoutes'); // Import image routes

const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable or default

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// ----- SERVE STATIC FILES (IMAGES) -----
// This line tells Express to serve any files in the 'public' directory
// as static files. For example, a request to /images/myimage.jpg
// will look for a file at public/images/myimage.jpg
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in your .env file.");
    process.exit(1); // Exit if the connection string is not found
}

mongoose.connect(mongoURI, {})
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
});

// Basic Route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend API!' });
});

app.use('/api/images', imageRoutes); // Use image routes

// Image Routes (placeholder - you'll build these out)
// Example: app.get('/api/images/random', imageController.getRandomImage);
// Example: app.post('/api/images/guess', imageController.submitGuess);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});