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
  Activity,
  Container,
  Target,
  Brain,
  Shield,
  FileCheck,
  Loader
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  
  // System status states - in a real app, this would come from a global state/context
  const [systemStatus, setSystemStatus] = React.useState({
    phase: 'scanning', // idle, opening, scanning, analyzing, exploiting, reporting
    message: 'Scanning target containers',
    progress: 65,
    isActive: true
  });

  // Simulate status changes - in real app, this would be driven by actual system events
  React.useEffect(() => {
    const statusSequence = [
      { phase: 'opening', message: 'Opening docker containers', progress: 20 },
      { phase: 'scanning', message: 'Scanning target containers', progress: 45 },
      { phase: 'analyzing', message: 'Deciding attack paths', progress: 65 },
      { phase: 'exploiting', message: 'Generating exploits', progress: 80 },
      { phase: 'reporting', message: 'Generating reports', progress: 95 },
      { phase: 'idle', message: 'System ready', progress: 100 }
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < statusSequence.length) {
        setSystemStatus({
          ...statusSequence[currentIndex],
          isActive: statusSequence[currentIndex].phase !== 'idle'
        });
        currentIndex++;
      } else {
        // Reset to scanning after completing cycle
        currentIndex = 1;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (phase: string) => {
    switch (phase) {
      case 'opening':
        return Container;
      case 'scanning':
        return Target;
      case 'analyzing':
        return Brain;
      case 'exploiting':
        return Shield;
      case 'reporting':
        return FileCheck;
      default:
        return Activity;
    }
  };

  const getStatusColor = (phase: string) => {
    switch (phase) {
      case 'opening':
        return 'text-cyan';
      case 'scanning':
        return 'text-accent';
      case 'analyzing':
        return 'text-warning';
      case 'exploiting':
        return 'text-error';
      case 'reporting':
        return 'text-success';
      default:
        return 'text-success';
    }
  };

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
                    className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg transition-all duration-200 ${
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
          <div className={`p-3 rounded-lg bg-gray-850 ${
            collapsed ? 'flex justify-center' : ''
          }`}>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
              {React.createElement(getStatusIcon(systemStatus.phase), {
                className: `w-5 h-5 ${getStatusColor(systemStatus.phase)} ${
                  systemStatus.isActive ? 'animate-pulse' : ''
                }`
              })}
              {!collapsed && (
                <div className="flex-1 animate-fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">System Status</span>
                    {systemStatus.isActive && (
                      <Loader className="w-3 h-3 text-accent animate-spin" />
                    )}
                  </div>
                  <div className="text-xs text-gray-300 mb-2">{systemStatus.message}</div>
                  {systemStatus.isActive && (
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-500 ${
                          systemStatus.phase === 'opening' ? 'bg-cyan' :
                          systemStatus.phase === 'scanning' ? 'bg-accent' :
                          systemStatus.phase === 'analyzing' ? 'bg-warning' :
                          systemStatus.phase === 'exploiting' ? 'bg-error' :
                          'bg-success'
                        }`}
                        style={{ width: `${systemStatus.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;