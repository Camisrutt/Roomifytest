// password_verify.js
const { client } = require('../db');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    try {
        const collection = client.db('roomify_db').collection('users');
        const user = await collection.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('A database error occurred. Please try again later.');
    }
};