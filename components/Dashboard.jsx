import React, { useState, useEffect } from 'react';
import Analytics from '../utils/analytics';
import { FiBarChart2, FiX, FiUsers } from 'react-icons/fi';
import TrendChart from './analytics/TrendChart';
import axios from 'axios';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <div className="text-sm text-gray-600">{title}</div>
    </div>
    <div className={`text-xl md:text-2xl font-bold ${color}`}>
      {value.toLocaleString()}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ user: { totalVisits: 0, totalResumes: 0, totalDownloads: 0 }, global: { globalVisits: 0, uniqueUsers: 0, globalResumes: 0, globalDownloads: 0 }, trends: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' or 'global'

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('/api/analytics/get-stats?userId=YOUR_USER_ID'); // Replace with actual user ID
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch analytics data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[rgb(42,167,69)] text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[rgb(42,167,69)]/90 flex items-center gap-2 hover:scale-105 transition-transform"
        title="View Analytics"
      >
        <FiBarChart2 className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[90vw] md:w-[480px] max-w-[480px] bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200">
            <h3 className="text-base md:text-lg font-bold">Analytics Dashboard</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 hover:rotate-90 transition-transform"
            >
              <FiX className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="p-3 md:p-4 max-h-[80vh] overflow-y-auto">
            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <StatCard
                  title="Your Visits"
                  value={stats.user.totalVisits}
                  icon={<FiBarChart2 className="text-[rgb(42,167,69)]" />}
                  color="text-[rgb(42,167,69)]"
                />
                <StatCard
                  title="Your Resumes"
                  value={stats.user.totalResumes}
                  icon={<FiBarChart2 className="text-blue-500" />}
                  color="text-blue-500"
                />
              </div>
              <StatCard
                title="Your Downloads"
                value={stats.user.totalDownloads}
                icon={<FiBarChart2 className="text-orange-500" />}
                color="text-orange-500"
              />
            </div>

            <div className="space-y-3 md:space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <StatCard
                  title="Total Visits"
                  value={stats.global.globalVisits}
                  icon={<FiBarChart2 className="text-[rgb(42,167,69)]" />}
                  color="text-[rgb(42,167,69)]"
                />
                <StatCard
                  title="Unique Users"
                  value={stats.global.uniqueUsers}
                  icon={<FiUsers className="text-purple-500" />}
                  color="text-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <StatCard
                  title="Total Resumes"
                  value={stats.global.globalResumes}
                  icon={<FiBarChart2 className="text-blue-500" />}
                  color="text-blue-500"
                />
                <StatCard
                  title="Total Downloads"
                  value={stats.global.globalDownloads}
                  icon={<FiBarChart2 className="text-orange-500" />}
                  color="text-orange-500"
                />
              </div>
            </div>

            <div className="mt-4 md:mt-6">
              <h4 className="text-xs md:text-sm font-semibold mb-3 md:mb-4">7-Day Trends</h4>
              <div className="h-48 md:h-64 bg-white rounded-lg p-2 md:p-4">
                <TrendChart data={stats.trends} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 