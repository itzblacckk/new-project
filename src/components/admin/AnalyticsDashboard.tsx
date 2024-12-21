import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Analytics } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsDashboardProps {
  analytics: Analytics;
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const visitorData = {
    labels: analytics.visitorsByDay.map(day => day.date),
    datasets: [
      {
        label: 'Daily Visitors',
        data: analytics.visitorsByDay.map(day => day.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

  const pageViewsData = {
    labels: analytics.topPages.map(page => page.path),
    datasets: [
      {
        label: 'Page Views',
        data: analytics.topPages.map(page => page.views),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Page Views</h3>
          <p className="text-3xl font-bold text-blue-600">{analytics.pageViews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Unique Visitors</h3>
          <p className="text-3xl font-bold text-blue-600">{analytics.uniqueVisitors}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Avg. Time on Site</h3>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round(analytics.averageTimeOnSite / 60)} min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Visitor Trends</h3>
          <Line data={visitorData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <Bar data={pageViewsData} />
        </div>
      </div>
    </div>
  );
}