const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async (req, res) => {
    if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });

    const { id, password } = req.body;
    try {
        await client.connect();
        const collection = client.db('roomify_db').collection('users');
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { password } }
        );
        res.status(200).json({ message: 'User password updated', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
