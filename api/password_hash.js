// api/password_hash.js

import { parse } from 'querystring';
import { client } from '../db';  // Adjust the path according to your project structure
import bcrypt from 'bcrypt';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { username, email, password } = parse(body);

    if (!username || !email || !password) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const collection = client.db('roomify_db').collection('users');

      // Ensure unique indexes on username and email
      await collection.createIndex({ username: 1 }, { unique: true });
      await collection.createIndex({ email: 1 }, { unique: true });

      const result = await collection.insertOne({ username, email, password: hashedPassword });

      res.status(200).json({ message: 'User created', data: { id: result.insertedId } });
    } catch (error) {
      console.error('Database Error:', error);

      if (error.code === 11000) {
        res.status(409).json({ error: 'Username or email already exists.' });
      } else {
        res.status(500).json({ error: 'A database error occurred. Please try again later.' });
      }
    }
  });
};
