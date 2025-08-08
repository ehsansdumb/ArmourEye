import React, { useState } from 'react';
import { Settings, Play, Pause, Square, Zap, Shield, Search } from 'lucide-react';

const ScanManager: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState('standard');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [scanStatus, setScanStatus] = useState('idle'); // idle, running, paused

  const profiles = [
    {
      id: 'quick',
      name: 'Quick Scan',
      icon: Zap,
      description: 'Fast reconnaissance and basic vulnerability detection',
      duration: '15-30 minutes',
      color: 'text-success'
    },
    {
      id: 'standard',
      name: 'Standard Scan',
      icon: Shield,
      description: 'Comprehensive vulnerability assessment with exploitation attempts',
      duration: '1-2 hours',
      color: 'text-accent'
    },
    {
      id: 'deep',
      name: 'Deep Scan',
      icon: Search,
      description: 'Thorough penetration test with post-exploitation analysis',
      duration: '3-6 hours',
      color: 'text-warning'
    }
  ];

  const handleStartScan = () => {
    setScanStatus('running');
  };

  const handlePauseScan = () => {
    setScanStatus('paused');
  };

  const handleStopScan = () => {
    setScanStatus('idle');
  };

  return (
    <div className="bg-secondary rounded-xl border border-gray-700 p-6 space-y-8">
      {/* Scan Manager Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Scan Manager</h2>
        {/* Scan Profile Selection */}
        <div className="space-y-3 mb-6">
          {profiles.map((profile) => (
            <label
              key={profile.id}
              className={`block p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedProfile === profile.id
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="scanProfile"
                value={profile.id}
                checked={selectedProfile === profile.id}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-start space-x-3">
                <profile.icon className={`w-5 h-5 mt-0.5 ${profile.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium">{profile.name}</h3>
                    <span className="text-gray-400 text-sm">{profile.duration}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{profile.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
        {/* Advanced Settings Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-2 flex items-center space-x-2 text-accent hover:text-accent-light transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Advanced Settings</span>
        </button>
        {/* Advanced Settings Panel */}
        {showAdvanced && (
          <div className="mt-4 p-4 bg-gray-850 rounded-lg animate-fade-in">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Concurrent Threads
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-3 py-2 bg-secondary border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="aggressive"
                  className="w-4 h-4 text-accent border-gray-600 rounded focus:ring-accent focus:ring-2"
                />
                <label htmlFor="aggressive" className="text-sm text-gray-300">
                  Enable aggressive scanning
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="stealth"
                  defaultChecked
                  className="w-4 h-4 text-accent border-gray-600 rounded focus:ring-accent focus:ring-2"
                />
                <label htmlFor="stealth" className="text-sm text-gray-300">
                  Use stealth techniques
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Scan Control Section (merged) */}
      <div>
        <div className="flex space-x-3">
          {scanStatus === 'idle' && (
            <button
              onClick={handleStartScan}
              className="flex items-center space-x-2 px-6 py-3 bg-success hover:bg-success/80 text-white rounded-lg font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Start Scan</span>
            </button>
          )}
          {scanStatus === 'running' && (
            <>
              <button
                onClick={handlePauseScan}
                className="flex items-center space-x-2 px-6 py-3 bg-warning hover:bg-warning/80 text-white rounded-lg font-medium transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
              <button
                onClick={handleStopScan}
                className="flex items-center space-x-2 px-6 py-3 bg-error hover:bg-error/80 text-white rounded-lg font-medium transition-colors"
              >
                <Square className="w-4 h-4" />
                <span>Stop</span>
              </button>
            </>
          )}
          {scanStatus === 'paused' && (
            <>
              <button
                onClick={handleStartScan}
                className="flex items-center space-x-2 px-6 py-3 bg-success hover:bg-success/80 text-white rounded-lg font-medium transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </button>
              <button
                onClick={handleStopScan}
                className="flex items-center space-x-2 px-6 py-3 bg-error hover:bg-error/80 text-white rounded-lg font-medium transition-colors"
              >
                <Square className="w-4 h-4" />
                <span>Stop</span>
              </button>
            </>
          )}
        </div>
        {scanStatus !== 'idle' && (
          <div className="mt-4 p-3 bg-gray-850 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                scanStatus === 'running' ? 'bg-success' : 'bg-warning'
              }`}></div>
              <span className="text-sm text-gray-300">
                Scan {scanStatus} - {scanStatus === 'running' ? 'Actively scanning targets' : 'Scan paused'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanManager;