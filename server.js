const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Database connection details should be kept secret (use environment variables)
const databaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

// Create a MySQL pool
const pool = mysql.createPool(databaseConfig);

const app = express();

// CORS options
const corsOptions = {
    origin: 'https://bdnwog.github.io', // Allow only your GitHub Pages domain
    optionsSuccessStatus: 200 // For legacy browser support
};

// Enable CORS with the options
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

app.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (rows.length) {
        return res.status(409).send({ message: "Email already in use." });
      }

      await pool.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );

      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
