import React from 'react';
import TargetList from '../components/scan/TargetList';
import ScanProfile from '../components/scan/ScanProfile';
import LogPanel from '../components/scan/LogPanel';
import ProgressTracker from '../components/scan/ProgressTracker';

const ScanPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scan Manager</h1>
          <p className="text-gray-400 mt-2">Configure and monitor AI-driven penetration tests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Configuration */}
        <div className="xl:col-span-1 space-y-6">
          <TargetList />
          <ScanProfile />
        </div>

        {/* Right Column - Monitoring */}
        <div className="xl:col-span-2 space-y-6">
          <ProgressTracker />
          <LogPanel />
        </div>
      </div>
    </div>
  );
};

export default ScanPage;