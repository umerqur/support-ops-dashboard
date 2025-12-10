import React from 'react';
import { Filter, Download } from 'lucide-react';

interface FiltersProps {
  segments: string[];
  serviceAreas: string[];
  selectedSegment: string;
  selectedServiceArea: string;
  onSegmentChange: (segment: string) => void;
  onServiceAreaChange: (serviceArea: string) => void;
  onDownload: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  segments,
  serviceAreas,
  selectedSegment,
  selectedServiceArea,
  onSegmentChange,
  onServiceAreaChange,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-ingram-blue" />
          <span className="text-sm font-semibold text-gray-700">Filters:</span>
        </div>

        <div className="flex-1 flex flex-wrap gap-4">
          <div className="min-w-[200px]">
            <label htmlFor="segment" className="block text-xs font-medium text-gray-700 mb-1">
              Customer Segment
            </label>
            <select
              id="segment"
              value={selectedSegment}
              onChange={(e) => onSegmentChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ingram-blue focus:border-ingram-blue text-sm"
            >
              <option value="All">All Segments</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[200px]">
            <label htmlFor="serviceArea" className="block text-xs font-medium text-gray-700 mb-1">
              Service Area
            </label>
            <select
              id="serviceArea"
              value={selectedServiceArea}
              onChange={(e) => onServiceAreaChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ingram-blue focus:border-ingram-blue text-sm"
            >
              <option value="All">All Service Areas</option>
              {serviceAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onDownload}
          className="px-4 py-2 bg-ingram-blue text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
        >
          <Download size={18} />
          Download Raw Data
        </button>
      </div>
    </div>
  );
};

export default Filters;
