// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://samiller1109:k8FAhQQC8OO7lHSH@cluster1.jh36l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToMongoDB() {
    try {
        // Connect to MongoDB and verify connection
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

module.exports = { connectToMongoDB, client };