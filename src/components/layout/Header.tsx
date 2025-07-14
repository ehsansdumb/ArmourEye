import React from 'react';
import { Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary border-b border-gray-700 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="relative">
            <Shield className="w-8 h-8 text-accent" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
            ArmourEye
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="text-gray-500">|</div>
            <span>AI Engine Ready</span>
          </div>
          
          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;