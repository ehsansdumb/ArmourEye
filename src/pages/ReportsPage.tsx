import React from 'react';
import ReportTable from '../components/reports/ReportTable';
import ReportDetail from '../components/reports/ReportDetail';

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scan Reports</h1>
          <p className="text-gray-400 mt-2">View and analyze penetration test results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ReportTable />
        </div>
        <div className="xl:col-span-1">
          <ReportDetail />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;