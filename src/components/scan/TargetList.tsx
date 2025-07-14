import React, { useState } from 'react';
import { Target, Network, Plug, CheckSquare, Square } from 'lucide-react';

const TargetList: React.FC = () => {
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const targets = [
    {
      id: 'web-server',
      alias: 'web-server',
      ip: '172.20.0.2',
      networks: ['web-network'],
      ports: ['80:8080', '443:8443'],
      status: 'running'
    },
    {
      id: 'api-service',
      alias: 'api-service',
      ip: '172.20.0.3',
      networks: ['web-network', 'api-network'],
      ports: ['3000:3000'],
      status: 'running'
    },
    {
      id: 'database',
      alias: 'database',
      ip: '172.21.0.2',
      networks: ['db-network'],
      ports: ['5432:5432'],
      status: 'running'
    },
    {
      id: 'auth-service',
      alias: 'auth-service',
      ip: '172.20.0.4',
      networks: ['web-network'],
      ports: ['8080:8080'],
      status: 'running'
    }
  ];

  const toggleTarget = (targetId: string) => {
    setSelectedTargets(prev => 
      prev.includes(targetId)
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  const toggleAll = () => {
    setSelectedTargets(
      selectedTargets.length === targets.length ? [] : targets.map(t => t.id)
    );
  };

  return (
    <div className="bg-secondary rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Target Selection</h2>
        <button
          onClick={toggleAll}
          className="flex items-center space-x-2 text-sm text-accent hover:text-accent-light transition-colors"
        >
          {selectedTargets.length === targets.length ? (
            <CheckSquare className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          <span>Select All</span>
        </button>
      </div>

      <div className="space-y-3">
        {targets.map((target) => (
          <div
            key={target.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedTargets.includes(target.id)
                ? 'border-accent bg-accent/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => toggleTarget(target.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {selectedTargets.includes(target.id) ? (
                  <CheckSquare className="w-5 h-5 text-accent" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-white font-medium">{target.alias}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    target.status === 'running' ? 'bg-success animate-pulse' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">IP:</span>
                    <span className="text-white font-mono">{target.ip}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Network className="w-3 h-3 text-cyan" />
                    <span className="text-gray-400">Networks:</span>
                    <div className="flex space-x-1">
                      {target.networks.map((network) => (
                        <span key={network} className="bg-cyan/20 text-cyan px-2 py-0.5 rounded text-xs">
                          {network}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Plug className="w-3 h-3 text-success" />
                    <span className="text-gray-400">Ports:</span>
                    <div className="flex space-x-1">
                      {target.ports.map((port) => (
                        <span key={port} className="bg-success/20 text-success px-2 py-0.5 rounded text-xs font-mono">
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {selectedTargets.length} of {targets.length} targets selected
          </span>
          <span className="text-accent">
            {selectedTargets.length > 0 && `${selectedTargets.length} ready for scanning`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TargetList;