'use client';

import React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })),
    datasets: [
      {
        label: 'Visits',
        data: data.map(d => Number(d.visits) || 0),
        borderColor: 'rgb(42,167,69)',
        backgroundColor: 'rgba(42,167,69,0.1)',
        tension: 0.4
      },
      {
        label: 'Resumes',
        data: data.map(d => Number(d.resumes) || 0),
        borderColor: 'rgb(59,130,246)',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4
      },
      {
        label: 'Downloads',
        data: data.map(d => Number(d.downloads) || 0),
        borderColor: 'rgb(249,115,22)',
        backgroundColor: 'rgba(249,115,22,0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrendChart; 