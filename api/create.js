// create.js
const { client } = require('../../db');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const collection = client.db('roomify_db').collection('users');
        const result = await collection.insertOne(req.body);
        res.status(200).json({ message: 'User created', data: result });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: error.message });
    }
};