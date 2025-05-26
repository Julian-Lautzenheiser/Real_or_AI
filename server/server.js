// server/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable or default

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in your .env file.");
    process.exit(1); // Exit if the connection string is not found
}

mongoose.connect(mongoURI, {
    // Remove useNewUrlParser and useUnifiedTopology as they are deprecated
    // Mongoose 6+ handles these by default.
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
});

// Basic Route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend API!' });
});

// Image Routes (placeholder - you'll build these out)
// Example: app.get('/api/images/random', imageController.getRandomImage);
// Example: app.post('/api/images/guess', imageController.submitGuess);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});