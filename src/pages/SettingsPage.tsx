import React from 'react';
import { Settings, User, Shield, Database, Bell, Palette, Globe, Lock } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">Configure your ArmourEye platform preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-secondary rounded-xl border border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Settings Categories</h2>
            <nav className="space-y-2">
              {[
                { icon: User, label: 'Profile', active: true },
                { icon: Shield, label: 'Security' },
                { icon: Database, label: 'Scanning' },
                { icon: Bell, label: 'Notifications' },
                { icon: Palette, label: 'Appearance' },
                { icon: Globe, label: 'Network' },
                { icon: Lock, label: 'Privacy' },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    item.active
                      ? 'bg-accent text-white'
                      : 'text-gray-300 hover:bg-gray-750 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-secondary rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Security"
                    className="w-full px-3 py-2 bg-gray-850 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Analyst"
                    className="w-full px-3 py-2 bg-gray-850 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="analyst@company.com"
                  className="w-full px-3 py-2 bg-gray-850 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  defaultValue="Security Corp"
                  className="w-full px-3 py-2 bg-gray-850 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-secondary rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-850 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                  <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-850 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Session Timeout</h4>
                  <p className="text-gray-400 text-sm">Automatically log out after inactivity</p>
                </div>
                <select className="px-3 py-2 bg-secondary border border-gray-600 rounded text-white focus:outline-none focus:border-accent">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scanning Preferences */}
          <div className="bg-secondary rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Scanning Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Default Scan Profile
                </label>
                <select className="w-full px-3 py-2 bg-gray-850 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent">
                  <option>Quick Scan</option>
                  <option>Standard Scan</option>
                  <option>Deep Scan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Concurrent Scans Limit
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 bg-gray-850 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoExport"
                  defaultChecked
                  className="w-4 h-4 text-accent border-gray-600 rounded focus:ring-accent focus:ring-2"
                />
                <label htmlFor="autoExport" className="text-gray-300">
                  Automatically export reports after scan completion
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;