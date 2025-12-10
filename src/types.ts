export interface Ticket {
  ticket_id: string;
  customer_segment: string;
  service_area: string;
  priority: string;
  first_response_time_hours: number;
  resolution_time_hours: number;
  escalated: string;
  sentiment: string;
  created_date: string;
}

export interface KPIData {
  totalTickets: number;
  escalationRate: number;
  negativeSentimentRate: number;
  avgResolutionTime: number;
}

export interface SegmentComparison {
  segment: string;
  totalTickets: number;
  escalationRate: number;
  avgResolutionTime: number;
  negativeSentiment: number;
}
