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
        throw new Error("Database connection failed");
    }
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const db = await connectToDatabase();
        console.log("Database instance:", db);
        const { userId } = req.query;
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        console.log("Fetching stats for userId:", userId);

        // Get user stats
        const userStats = await db.collection('analytics').aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    totalVisits: { $sum: "$visits" },
                    totalResumes: { $sum: "$resumesCreated" },
                    totalDownloads: { $sum: "$downloadsCount" }
                }
            }
        ]).toArray();

        // Get global stats
        const globalStats = await db.collection('analytics').aggregate([
            {
                $group: {
                    _id: null,
                    globalVisits: { $sum: "$visits" },
                    uniqueUsers: { $addToSet: "$userId" },
                    globalResumes: { $sum: "$resumesCreated" },
                    globalDownloads: { $sum: "$downloadsCount" }
                }
            }
        ]).toArray();

        // Get daily trends for last 7 days
        const dailyTrends = await db.collection('analytics').aggregate([
            {
                $match: {
                    timestamp: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    visits: { $sum: "$visits" },
                    resumes: { $sum: "$resumesCreated" },
                    downloads: { $sum: "$downloadsCount" }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray();

        // After fetching user stats
        console.log("User Stats:", userStats);

        // After fetching global stats
        console.log("Global Stats:", globalStats);

        // After fetching daily trends
        console.log("Daily Trends:", dailyTrends);

        res.status(200).json({
            user: userStats[0] || { totalVisits: 0, totalResumes: 0, totalDownloads: 0 },
            global: {
                globalVisits: globalStats[0]?.globalVisits || 0,
                uniqueUsers: globalStats[0]?.uniqueUsers.length || 0,
                globalResumes: globalStats[0]?.globalResumes || 0,
                globalDownloads: globalStats[0]?.globalDownloads || 0
            },
            trends: dailyTrends || []
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Error fetching analytics' });
    }
}