const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

// Enable CORS for frontend communication
app.use(cors({
    origin: 'https://bdnwog.github.io', // Allow only your GitHub Pages domain
    optionsSuccessStatus: 200 // For legacy browser support
}));

// Parse JSON bodies
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ email: req.body.email, password: hashedPassword });
      await newUser.save(); // Save the user to MongoDB
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

// Start the server on the provided port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
