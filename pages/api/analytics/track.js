import sequelize from '../../../lib/db';
import Analytics from '../../../models/Analytics';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, userId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    // Find or create today's record
    const [record] = await Analytics.findOrCreate({
      where: { 
        date: today,
        userId: userId 
      },
      defaults: {
        visits: 0,
        resumesCreated: 0,
        downloadsCount: 0
      }
    });

    // Update the specific counter
    switch (type) {
      case 'visit':
        await record.increment('visits');
        break;
      case 'resume':
        await record.increment('resumesCreated');
        break;
      case 'download':
        await record.increment('downloadsCount');
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Error tracking analytics' });
  }
} 