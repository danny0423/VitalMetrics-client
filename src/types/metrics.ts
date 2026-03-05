export type Rating = 'good' | 'warning' | 'poor';

export interface MetricData {
  label: string;
  value: string;
  unit: string;
  rating: Rating;
  trend: number;
  trendLabel: string;
}

export interface ChartPoint {
  time: string;
  lcp: number;
  inp: number;
}

export interface TableRow {
  time: string;
  url: string;
  lcp: { value: string; rating: Rating };
  inp: { value: string; rating: Rating };
  cls: { value: string; rating: Rating };
}
