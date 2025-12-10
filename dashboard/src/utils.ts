import * as XLSX from 'xlsx';
import type { Ticket, KPIData, SegmentComparison } from './types';

export const loadExcelData = async (filePath: string): Promise<Ticket[]> => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet) as any[];

    return jsonData.map((row) => ({
      ticket_id: row['Ticket ID'] || row.ticket_id || '',
      customer_segment: row['Customer Segment'] || row.customer_segment || '',
      service_area: row['Service Area'] || row.service_area || '',
      priority: row['Priority'] || row.priority || '',
      first_response_time_hours: parseFloat(row['First Response Time (hours)'] || row.first_response_time_hours || 0),
      resolution_time_hours: parseFloat(row['Resolution Time (hours)'] || row.resolution_time_hours || 0),
      escalated: row['Escalated'] || row.escalated || '',
      sentiment: row['Sentiment'] || row.sentiment || '',
      created_date: row['Created Date'] || row.created_date || '',
    }));
  } catch (error) {
    console.error('Error loading Excel data:', error);
    return [];
  }
};

export const calculateKPIs = (tickets: Ticket[]): KPIData => {
  const totalTickets = tickets.length;
  const escalatedCount = tickets.filter(t => t.escalated === 'Yes').length;
  const negativeSentimentCount = tickets.filter(t => t.sentiment === 'Negative').length;
  const totalResolutionTime = tickets.reduce((sum, t) => sum + t.resolution_time_hours, 0);

  return {
    totalTickets,
    escalationRate: totalTickets > 0 ? (escalatedCount / totalTickets) * 100 : 0,
    negativeSentimentRate: totalTickets > 0 ? (negativeSentimentCount / totalTickets) * 100 : 0,
    avgResolutionTime: totalTickets > 0 ? totalResolutionTime / totalTickets : 0,
  };
};

export const getTippingPointData = (tickets: Ticket[]) => {
  const timeRanges = [
    { label: '0-2h', min: 0, max: 2 },
    { label: '2-4h', min: 2, max: 4 },
    { label: '4-6h', min: 4, max: 6 },
    { label: '6-8h', min: 6, max: 8 },
    { label: '8-12h', min: 8, max: 12 },
    { label: '12-24h', min: 12, max: 24 },
    { label: '24h+', min: 24, max: Infinity },
  ];

  return timeRanges.map(range => {
    const ticketsInRange = tickets.filter(
      t => t.first_response_time_hours >= range.min && t.first_response_time_hours < range.max
    );
    const negativeCount = ticketsInRange.filter(t => t.sentiment === 'Negative').length;
    const negativeSentimentRate = ticketsInRange.length > 0
      ? (negativeCount / ticketsInRange.length) * 100
      : 0;

    return {
      timeRange: range.label,
      negativeSentimentRate: parseFloat(negativeSentimentRate.toFixed(1)),
      totalTickets: ticketsInRange.length,
    };
  });
};

export const getTopServiceAreas = (tickets: Ticket[], limit: number = 5) => {
  const serviceAreaCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.service_area] = (acc[ticket.service_area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(serviceAreaCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const getSegmentComparison = (tickets: Ticket[]): SegmentComparison[] => {
  const segments = ['Enterprise', 'SMB', 'Startup'];

  return segments.map(segment => {
    const segmentTickets = tickets.filter(t => t.customer_segment === segment);
    const escalatedCount = segmentTickets.filter(t => t.escalated === 'Yes').length;
    const negativeSentimentCount = segmentTickets.filter(t => t.sentiment === 'Negative').length;
    const totalResolutionTime = segmentTickets.reduce((sum, t) => sum + t.resolution_time_hours, 0);

    return {
      segment,
      totalTickets: segmentTickets.length,
      escalationRate: segmentTickets.length > 0 ? (escalatedCount / segmentTickets.length) * 100 : 0,
      avgResolutionTime: segmentTickets.length > 0 ? totalResolutionTime / segmentTickets.length : 0,
      negativeSentiment: segmentTickets.length > 0 ? (negativeSentimentCount / segmentTickets.length) * 100 : 0,
    };
  });
};

export const downloadExcel = async (filePath: string, fileName: string) => {
  try {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
