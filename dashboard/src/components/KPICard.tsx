import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  suffix?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, suffix = '' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-ingram-blue">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toFixed(1) : value}
            </p>
            {suffix && <span className="ml-1 text-xl font-semibold text-gray-600">{suffix}</span>}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-ingram-blue bg-blue-50 p-3 rounded-full">
            {icon}
          </div>
          {trend && (
            <div className={`mt-2 flex items-center text-sm ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
              {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
