const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI and database name
const uri = "your_mongodb_uri_here"; // Replace with your MongoDB URI
const dbName = "morningBriefDB";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/signup', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const users = db.collection('users');

        const { email } = req.body;

        // Check if the email already exists
        const userExists = await users.findOne({ email: email });
        if (userExists) {
            return res.status(409).send({ message: "Email already in use." });
        }

        // Insert the new user with just an email
        await users.insertOne({ email: email });

        res.status(201).send({ message: "User created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    } finally {
        await client.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
