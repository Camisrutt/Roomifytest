// api/get_profiles.js

import { connectToMongoDB } from '../db';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { db } = await connectToMongoDB();
    const collection = db.collection('profiles'); // Ensure you have a 'profiles' collection
    const profiles = await collection.find({}).toArray();

    res.status(200).json({ profiles });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
