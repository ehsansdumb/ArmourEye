import React from 'react';
import { CheckCircle, Circle, Clock, Zap } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const steps = [
    { id: 1, name: 'Recon', status: 'completed', description: 'Network reconnaissance' },
    { id: 2, name: 'Enum', status: 'current', description: 'Service enumeration' },
    { id: 3, name: 'Exploit', status: 'pending', description: 'Vulnerability exploitation' },
    { id: 4, name: 'Post-Exploit', status: 'pending', description: 'Post-exploitation analysis' },
    { id: 5, name: 'Reporting', status: 'pending', description: 'Report generation' },
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'current':
        return <Zap className="w-6 h-6 text-accent animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-success bg-success/10';
      case 'current':
        return 'border-accent bg-accent/10';
      default:
        return 'border-gray-600';
    }
  };

  return (
    <div className="bg-secondary rounded-xl border border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-semibold text-white">Scan Progress</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${getStepColor(step.status)}`}>
              <div className="flex-shrink-0">
                {getStepIcon(step.status)}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${
                    step.status === 'completed' ? 'text-success' :
                    step.status === 'current' ? 'text-accent' :
                    'text-gray-400'
                  }`}>
                    {step.name}
                  </h3>
                  {step.status === 'current' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-accent text-sm font-medium">In Progress</span>
                    </div>
                  )}
                  {step.status === 'completed' && (
                    <span className="text-success text-sm font-medium">Completed</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                
                {step.status === 'current' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-accent text-xs mt-1">Enumerating services on 4 targets...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-[1.5rem] top-[4.5rem] w-px h-4 bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 font-medium">Overall Progress</span>
          <span className="text-accent font-bold">2/5 Steps</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-gradient-to-r from-accent to-success h-3 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;