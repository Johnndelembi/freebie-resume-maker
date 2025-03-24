const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = await connectToDatabase();
        const { userId, visits, resumesCreated, downloadsCount } = req.body;

        try {
            const result = await db.collection('analytics').insertOne({
                userId,
                visits,
                resumesCreated,
                downloadsCount,
                timestamp: new Date()
            });
            res.status(201).json({ success: true, id: result.insertedId });
        } catch (error) {
            console.error("Error inserting analytics data:", error);
            res.status(500).json({ success: false, error: 'Failed to track data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 