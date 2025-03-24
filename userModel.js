const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

async function getUserById(userId) {
    const db = await connectToDatabase();
    return await db.collection('users').findOne({ _id: userId });
}

async function createUser(userData) {
    const db = await connectToDatabase();
    const result = await db.collection('users').insertOne(userData);
    return result.insertedId;
} 