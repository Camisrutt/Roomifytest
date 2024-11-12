const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        await client.connect();
        const collection = client.db('roomify_db').collection('users');
        const result = await collection.insertOne(req.body);
        res.status(200).json({ message: 'User created', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
