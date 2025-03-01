import sequelize from '../../../lib/db';
import Analytics from '../../../models/Analytics';
import { Op } from 'sequelize';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get user stats
    const userStats = await Analytics.findOne({
      where: { userId },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('visits')), 'totalVisits'],
        [sequelize.fn('SUM', sequelize.col('resumesCreated')), 'totalResumes'],
        [sequelize.fn('SUM', sequelize.col('downloadsCount')), 'totalDownloads']
      ],
      raw: true
    });

    // Get global stats
    const globalStats = await Analytics.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('visits')), 'globalVisits'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))), 'uniqueUsers'],
        [sequelize.fn('SUM', sequelize.col('resumesCreated')), 'globalResumes'],
        [sequelize.fn('SUM', sequelize.col('downloadsCount')), 'globalDownloads']
      ],
      raw: true
    });

    // Get daily trends for last 7 days
    const dailyTrends = await Analytics.findAll({
      where: {
        date: {
          [Op.gte]: sevenDaysAgo
        }
      },
      attributes: [
        'date',
        [sequelize.fn('SUM', sequelize.col('visits')), 'visits'],
        [sequelize.fn('SUM', sequelize.col('resumesCreated')), 'resumes'],
        [sequelize.fn('SUM', sequelize.col('downloadsCount')), 'downloads']
      ],
      group: ['date'],
      order: [['date', 'ASC']],
      raw: true
    });

    res.status(200).json({
      user: userStats || { totalVisits: 0, totalResumes: 0, totalDownloads: 0 },
      global: globalStats || { globalVisits: 0, uniqueUsers: 0, globalResumes: 0, globalDownloads: 0 },
      trends: dailyTrends || []
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Error fetching analytics' });
  }
}