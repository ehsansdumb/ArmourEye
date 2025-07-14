import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Download, X, Search, Filter } from 'lucide-react';

const LogPanel: React.FC = () => {
  const logRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<Array<{ id: number; timestamp: string; type: string; source: string; message: string }>>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulate log entries
  useEffect(() => {
    const logEntries = [
      { type: 'info', source: 'nmap', message: 'Starting port scan on 172.20.0.2...' },
      { type: 'success', source: 'nmap', message: 'Port 80/tcp open - Apache 2.4.41' },
      { type: 'success', source: 'nmap', message: 'Port 443/tcp open - Apache 2.4.41 (SSL)' },
      { type: 'ai', source: 'ai-engine', message: 'Detected Apache web server, queuing web application tests' },
      { type: 'info', source: 'gobuster', message: 'Starting directory enumeration...' },
      { type: 'success', source: 'gobuster', message: 'Found directory: /admin' },
      { type: 'warning', source: 'gobuster', message: 'Found sensitive file: /backup.sql' },
      { type: 'ai', source: 'ai-engine', message: 'High-value target identified: database backup file detected' },
      { type: 'info', source: 'sqlmap', message: 'Testing for SQL injection vulnerabilities...' },
      { type: 'error', source: 'sqlmap', message: 'Connection timeout - retrying with different payload' },
      { type: 'success', source: 'sqlmap', message: 'SQL injection vulnerability confirmed!' },
      { type: 'ai', source: 'ai-engine', message: 'Critical vulnerability found: SQL injection in login form' },
      { type: 'info', source: 'metasploit', message: 'Loading exploit module...' },
      { type: 'success', source: 'metasploit', message: 'Exploit successful - shell acquired' },
      { type: 'ai', source: 'ai-engine', message: 'Proceeding with post-exploitation enumeration...' },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logEntries.length) {
        const entry = logEntries[index];
        setLogs(prev => [...prev, {
          id: Date.now() + index,
          timestamp: new Date().toLocaleTimeString(),
          ...entry
        }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (autoScroll && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'ai':
        return 'text-cyan';
      default:
        return 'text-gray-300';
    }
  };

  const getLogBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'error':
        return 'bg-error/10 border-error/20';
      case 'ai':
        return 'bg-cyan/10 border-cyan/20';
      default:
        return 'bg-gray-850/50 border-gray-700';
    }
  };

  const filteredLogs = logs.filter(log => filter === 'all' || log.type === filter);

  const clearLogs = () => {
    setLogs([]);
  };

  const downloadLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] ${log.source.toUpperCase()}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-secondary rounded-xl border border-gray-700 p-6 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-semibold text-white">Live Scan Logs</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 bg-gray-850 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-accent"
          >
            <option value="all">All Logs</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="ai">AI Engine</option>
          </select>
          
          <button
            onClick={clearLogs}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Clear logs"
          >
            <X className="w-4 h-4" />
          </button>
          
          <button
            onClick={downloadLogs}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Download logs"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        ref={logRef}
        className="flex-1 bg-gray-900 rounded-lg p-4 overflow-y-auto font-mono text-sm space-y-1"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          setAutoScroll(scrollTop + clientHeight >= scrollHeight - 10);
        }}
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Waiting for scan logs...</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className={`p-2 rounded border ${getLogBg(log.type)} animate-fade-in`}>
              <div className="flex items-start space-x-3">
                <span className="text-gray-500 text-xs">{log.timestamp}</span>
                <span className={`text-xs font-bold uppercase ${getLogColor(log.type)}`}>
                  {log.source}
                </span>
                <span className={`flex-1 ${getLogColor(log.type)}`}>
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoScroll"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="w-4 h-4 text-accent border-gray-600 rounded focus:ring-accent focus:ring-2"
          />
          <label htmlFor="autoScroll" className="text-gray-300 text-sm">
            Auto-scroll
          </label>
        </div>
        
        <div className="text-gray-400 text-sm">
          {filteredLogs.length} {filter === 'all' ? 'total' : filter} entries
        </div>
      </div>
    </div>
  );
};

export default LogPanel;