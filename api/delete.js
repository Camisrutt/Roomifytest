// api/delete.js
import { connectToMongoDB } from '../db';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const { id } = JSON.parse(body);

    if (!id) {
      res.status(400).json({ error: 'ID is required.' });
      return;
    }

    try {
      const { db } = await connectToMongoDB();
      const collection = db.collection('users');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
