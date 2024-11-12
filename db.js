// [db.js](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fcamisrutt%2FGithub%20Projects%2FWeb%20Dev%2FRoomifytest%2Fdb.js%22%2C%22path%22%3A%22%2Fhome%2Fcamisrutt%2FGithub%20Projects%2FWeb%20Dev%2FRoomifytest%2Fdb.js%22%2C%22scheme%22%3A%22file%22%7D%7D)
//Delete key below when put in .env file \/ (After project you'll want to delete this key)
//MONGODB_URI=mongodb+srv://samiller1109:k8FAhQQC8OO7lHSH@cluster1.jh36l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectToMongoDB, client };