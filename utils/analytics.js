const Analytics = {
  async init() {
    const userId = this.getUserId();
    try {
      const response = await fetch(`/api/analytics/get-stats?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const data = await response.json();
      return {
        user: data.user,
        global: data.global,
        trends: data.trends
      };
    } catch (error) {
      console.error('Error initializing analytics:', error);
      return {
        user: { totalVisits: 0, totalResumes: 0, totalDownloads: 0 },
        global: { globalVisits: 0, uniqueUsers: 0, globalResumes: 0, globalDownloads: 0 },
        trends: []
      };
    }
  },

  getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('userId', userId);
    }
    return userId;
  },

  async getAnalytics() {
    return await this.init();
  },

  async trackPageVisit() {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visit',
          userId: this.getUserId()
        })
      });
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  },

  async incrementResumeCount() {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resume',
          userId: this.getUserId()
        })
      });
    } catch (error) {
      console.error('Error tracking resume creation:', error);
    }
  },

  async incrementDownloadCount() {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'download',
          userId: this.getUserId()
        })
      });
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  },

  getRecentDailyVisits() {
    const dailyVisits = localStorage.getItem('analytics') 
      ? JSON.parse(localStorage.getItem('analytics')).dailyVisits 
      : {};
    
    const dates = Object.keys(dailyVisits).sort().slice(-7);
    return dates.map(date => ({
      date,
      visits: dailyVisits[date] || 0
    }));
  }
};

export default Analytics;