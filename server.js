const mongoose = require('mongoose');

// Connection URI from MongoDB Atlas dashboard
const mongoURI = 'your_mongodb_atlas_connection_uri';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// Define a User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Require the necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON bodies

// This would be replaced with your actual database connection logic
const users = []; // Placeholder for users

app.post('/signup', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ email: req.body.email, password: hashedPassword });
      await newUser.save(); // Save the user to MongoDB
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// CORS options
const corsOptions = {
    origin: 'https://bdnwog.github.io', // Allow only your GitHub Pages domain
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
