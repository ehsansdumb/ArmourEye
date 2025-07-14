import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, FileText, TrendingUp, Target, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    { label: 'Active Scans', value: '3', icon: Zap, color: 'text-cyan' },
    { label: 'Vulnerabilities Found', value: '47', icon: Target, color: 'text-error' },
    { label: 'Containers Monitored', value: '12', icon: Shield, color: 'text-accent' },
    { label: 'Reports Generated', value: '23', icon: FileText, color: 'text-success' },
  ];

  const recentActivity = [
    { action: 'Scan completed', target: 'web-app-prod', time: '2 minutes ago', status: 'success' },
    { action: 'High severity vuln detected', target: 'api-service', time: '15 minutes ago', status: 'warning' },
    { action: 'New container deployed', target: 'database-replica', time: '1 hour ago', status: 'info' },
    { action: 'Scan initiated', target: 'auth-service', time: '2 hours ago', status: 'info' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Monitor your security posture and AI-driven penetration tests</p>
        </div>
        <Link
          to="/setup"
          className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
        >
          New Scan Setup
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-secondary rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-850 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-secondary rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-750 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-success' :
                  activity.status === 'warning' ? 'bg-warning' :
                  'bg-accent'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.target}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
          <Link
            to="/reports"
            className="block mt-4 text-accent hover:text-accent-light text-sm font-medium transition-colors"
          >
            View all activity →
          </Link>
        </div>

        {/* System Status */}
        <div className="bg-secondary rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">System Status</h2>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-850">
              <span className="text-gray-300">AI Engine</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success text-sm font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-850">
              <span className="text-gray-300">Container Runtime</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success text-sm font-medium">Healthy</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-850">
              <span className="text-gray-300">Network Scanning</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success text-sm font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-850">
              <span className="text-gray-300">Vulnerability Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-warning text-sm font-medium">Updating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;