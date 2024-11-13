// api/check_password.js
import { parse } from 'querystring';
import { connectToMongoDB } from '../db';
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
    const { username, password } = parse(body);

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required.' });
      return;
    }

    try {
      const { db } = await connectToMongoDB();
      const collection = db.collection('users');
      const user = await collection.findOne({ username });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Authentication successful
        res.writeHead(302, {
          Location: '/html-pages/login_success.html?username=' + encodeURIComponent(username),
        });
        res.end();
      } else {
        res.writeHead(302, { Location: '/html-pages/login-page.html?error=1' });
        res.end();
      }
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).send('A database error occurred. Please try again later.');
    }
  });
};
