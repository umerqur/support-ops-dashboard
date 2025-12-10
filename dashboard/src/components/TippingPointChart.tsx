import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TippingPointChartProps {
  data: Array<{
    timeRange: string;
    negativeSentimentRate: number;
    totalTickets: number;
  }>;
}

const TippingPointChart: React.FC<TippingPointChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">The 4-Hour Tipping Point</h2>
      <p className="text-sm text-gray-600 mb-4">
        Negative sentiment increases significantly after 4 hours without response
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timeRange"
            label={{ value: 'First Response Time', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Negative Sentiment %', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'negativeSentimentRate') return [`${value.toFixed(1)}%`, 'Negative Sentiment'];
              return [value, name];
            }}
          />
          <Legend />
          <ReferenceLine x="4-6h" stroke="#ef4444" strokeDasharray="3 3" label="4-Hour Mark" />
          <Line
            type="monotone"
            dataKey="negativeSentimentRate"
            stroke="#0D6EFD"
            strokeWidth={3}
            dot={{ fill: '#0D6EFD', r: 5 }}
            activeDot={{ r: 7 }}
            name="Negative Sentiment %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TippingPointChart;
