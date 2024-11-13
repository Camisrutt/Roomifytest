// read.js
const { client } = require('../../db');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username } = req.query;

    try {
        const collection = client.db('roomify_db').collection('users');
        const user = await collection.findOne({ username });
        res.status(200).json(user);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: error.message });
    }
};