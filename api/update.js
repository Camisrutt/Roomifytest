// api/update.js
import { connectToMongoDB } from '../../db';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const { id, password } = JSON.parse(body);

    if (!id || !password) {
      res.status(400).json({ error: 'ID and password are required.' });
      return;
    }

    try {
      const { db } = await connectToMongoDB();
      const collection = db.collection('users');

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password } }
      );

      res.status(200).json({ message: 'User password updated', data: result });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
