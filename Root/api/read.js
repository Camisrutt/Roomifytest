const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async (req, res) => {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const { username } = req.query;
    try {
        await client.connect();
        const collection = client.db('roomify_db').collection('users');
        const user = await collection.findOne({ username });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
