import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Zap, 
  FileText, 
  Search,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/setup', icon: Settings, label: 'Setup' },
    { path: '/scan', icon: Zap, label: 'Scan' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Search, label: 'Settings' },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-secondary border-r border-gray-700 transition-all duration-300 z-40 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <button
            onClick={() => onToggle(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-750 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-accent text-white shadow-lg shadow-accent/20'
                        : 'text-gray-300 hover:bg-gray-750 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="font-medium animate-fade-in">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-850 ${
            collapsed ? 'justify-center' : ''
          }`}>
            <Activity className="w-5 h-5 text-success animate-pulse" />
            {!collapsed && (
              <div className="flex flex-col animate-fade-in">
                <span className="text-sm font-medium text-white">AI Engine</span>
                <span className="text-xs text-success">Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;