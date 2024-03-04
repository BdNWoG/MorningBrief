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
        // Hash the password - in production, you also need to validate the input
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a new user record and save to the database
        const user = { email: req.body.email, password: hashedPassword };
        users.push(user); // In production, you'd save this to your database
        res.status(201).send({ message: "User created successfully" });
    } catch {
        res.status(500).send();
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
