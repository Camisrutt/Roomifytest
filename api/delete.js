// delete.js
const { client } = require('../../db');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.body;

    try {
        const collection = client.db('roomify_db').collection('users');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'User deleted', data: result });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: error.message });
    }
};