// api/create.js
import { connectToMongoDB } from '../db';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const data = JSON.parse(body);

    // TODO: Validate and sanitize input data

    try {
      const { db } = await connectToMongoDB();
      const collection = db.collection('users');
      const result = await collection.insertOne(data);

      res.status(200).json({ message: 'User created', data: { id: result.insertedId } });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
