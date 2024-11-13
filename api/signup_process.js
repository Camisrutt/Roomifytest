// signup_process.js
const { client } = require('../db');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const collection = client.db('roomify_db').collection('users');
        const result = await collection.insertOne({ username, email, password: hashedPassword });

        res.redirect('/Root/html-pages/signup_success.html');
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.redirect('/Root/html-pages/account_exists.html');
        } else {
            console.error('Database Error:', error);
            res.status(500).send('A database error occurred. Please try again later.');
        }
    }
};