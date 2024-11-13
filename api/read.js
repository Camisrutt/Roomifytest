// api/read.js
import { connectToMongoDB } from '../db';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { username } = req.query;

  if (!username) {
    res.status(400).json({ error: 'Username is required.' });
    return;
  }

  try {
    const { db } = await connectToMongoDB();
    const collection = db.collection('users');
    const user = await collection.findOne({ username });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: error.message });
  }
};
