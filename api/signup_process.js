// api/signup_process.js
import { parse } from 'querystring';
import { connectToMongoDB } from '../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { username, email, password } = parse(body);

    try {
      const db = await connectToMongoDB();
      const collection = db.collection('users');
      const hashedPassword = await bcrypt.hash(password, 10);

      await collection.insertOne({ username, email, password: hashedPassword });

      res.writeHead(302, { Location: '/signup_success.html' });
      res.end();
    } catch (error) {
      if (error.code === 11000) {
        res.writeHead(302, { Location: '/account_exists.html' });
        res.end();
      } else {
        console.error('Database Error:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  });
};
