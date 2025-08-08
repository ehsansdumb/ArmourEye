import React from 'react';
import TargetList from '../components/scan/TargetList';
import ScanManager from '../components/scan/ScanProfile';
import LogPanel from '../components/scan/LogPanel';
import ProgressTracker from '../components/scan/ProgressTracker';

const ScanPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Orchestrator</h1>
          <p className="text-gray-400 mt-2">Configure and monitor AI-driven penetration tests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Configuration */}
        <div className="xl:col-span-1 space-y-6">
          {/* <TargetList /> */}
          <div className="bg-gray-850 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-2">Target Info</h2>
            <p className="text-gray-400 text-sm mb-2">Currently testing a single Docker image.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li><span className="font-medium">Image Name:</span> (your-image-name-here)</li>
              <li><span className="font-medium">Container ID:</span> (auto-generated)</li>
              <li><span className="font-medium">Status:</span> Ready for testing</li>
            </ul>
          </div>
          <ScanManager />
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