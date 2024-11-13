// [db.js](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fcamisrutt%2FGithub%20Projects%2FWeb%20Dev%2FRoomifytest%2Fdb.js%22%2C%22path%22%3A%22%2Fhome%2Fcamisrutt%2FGithub%20Projects%2FWeb%20Dev%2FRoomifytest%2Fdb.js%22%2C%22scheme%22%3A%22file%22%7D%7D)
//Delete key below when put in .env file \/ (After project you'll want to delete this key)
//MONGODB_URI=mongodb+srv://samiller1109:k8FAhQQC8OO7lHSH@cluster1.jh36l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
// db.js
// Root/db.js
// db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let cachedClient = null;
let cachedDb = null;

export async function connectToMongoDB() {
  if (cachedDb) {
    // Return cached database connection
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = await client.connect();
  cachedDb = cachedClient.db('roomify_db'); // Replace with your actual database name

  console.log('Connected to MongoDB');

  return { client: cachedClient, db: cachedDb };
}

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}