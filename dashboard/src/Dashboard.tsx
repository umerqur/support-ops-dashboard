import React, { useEffect, useState } from 'react';
import { BarChart3, AlertTriangle, ThumbsDown, Clock } from 'lucide-react';
import KPICard from './components/KPICard';
import TippingPointChart from './components/TippingPointChart';
import ServiceAreasChart from './components/ServiceAreasChart';
import SegmentTable from './components/SegmentTable';
import Filters from './components/Filters';
import type { Ticket, KPIData } from './types';
import {
  loadExcelData,
  calculateKPIs,
  getTippingPointData,
  getTopServiceAreas,
  getSegmentComparison,
  downloadExcel,
} from './utils';

const Dashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [selectedServiceArea, setSelectedServiceArea] = useState('All');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await loadExcelData('/ticket_data_clean.xlsx');
      setTickets(data);
      setFilteredTickets(data);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (selectedSegment !== 'All') {
      filtered = filtered.filter(t => t.customer_segment === selectedSegment);
    }

    if (selectedServiceArea !== 'All') {
      filtered = filtered.filter(t => t.service_area === selectedServiceArea);
    }

    setFilteredTickets(filtered);
  }, [selectedSegment, selectedServiceArea, tickets]);

  const kpis: KPIData = calculateKPIs(filteredTickets);
  const tippingPointData = getTippingPointData(filteredTickets);
  const topServiceAreas = getTopServiceAreas(filteredTickets, 5);
  const segmentComparison = getSegmentComparison(tickets);

  const uniqueSegments = Array.from(new Set(tickets.map(t => t.customer_segment))).sort();
  const uniqueServiceAreas = Array.from(new Set(tickets.map(t => t.service_area))).sort();

  const handleDownload = () => {
    downloadExcel('/ticket_data_clean.xlsx', 'ticket_data_clean.xlsx');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-ingram-blue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-ingram-blue p-2 rounded-lg">
              <BarChart3 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Operations Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Real-time insights into customer support performance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Filters
          segments={uniqueSegments}
          serviceAreas={uniqueServiceAreas}
          selectedSegment={selectedSegment}
          selectedServiceArea={selectedServiceArea}
          onSegmentChange={setSelectedSegment}
          onServiceAreaChange={setSelectedServiceArea}
          onDownload={handleDownload}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Tickets"
            value={kpis.totalTickets}
            icon={<BarChart3 size={24} />}
          />
          <KPICard
            title="Escalation Rate"
            value={kpis.escalationRate}
            suffix="%"
            icon={<AlertTriangle size={24} />}
            trend={kpis.escalationRate > 20 ? 'up' : 'down'}
          />
          <KPICard
            title="Negative Sentiment"
            value={kpis.negativeSentimentRate}
            suffix="%"
            icon={<ThumbsDown size={24} />}
            trend={kpis.negativeSentimentRate > 20 ? 'up' : 'down'}
          />
          <KPICard
            title="Avg Resolution Time"
            value={kpis.avgResolutionTime}
            suffix="hrs"
            icon={<Clock size={24} />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TippingPointChart data={tippingPointData} />
          <ServiceAreasChart data={topServiceAreas} />
        </div>

        {/* Segment Comparison Table */}
        <SegmentTable data={segmentComparison} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            Powered by Ingram Micro | Data updated in real-time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
