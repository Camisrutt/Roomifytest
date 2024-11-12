// password_hash.js
const { client } = require('../../db');
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

        res.status(200).json({ message: 'User created', data: result });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('A database error occurred. Please try again later.');
    }
};