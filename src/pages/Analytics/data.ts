import { Rating, Site } from "../../types/metrics";

// ============================================
// Types
// ============================================
export interface SummaryCard {
  label: string;
  value: string;
  trend?: number;
  rating?: Rating;
}

export interface DeviceRow {
  device: string;
  sessions: number;
  percentage: number;
  lcp: string;
  inp: string;
  cls: string;
  rating: Rating;
}

export interface ConnectionItem {
  name: string;
  value: number;
  color: string;
}

export interface BrowserRow {
  browser: string;
  percentage: number;
  lcp: string;
  rating: Rating;
}

export interface GeoRow {
  region: string;
  sessions: number;
  lcp: string;
  rating: Rating;
}

export interface HeatmapCell {
  day: string;
  hour: number;
  rating: Rating | null;
  value: number;
}

// ============================================
// Mock Data
// ============================================
export const SUMMARY_CARDS: SummaryCard[] = [
  { label: "Total Measurements", value: "12,847", trend: 12.4 },
  { label: "Good Rating", value: "68%", trend: 5.2, rating: "good" },
  { label: "Needs Improvement", value: "22%", trend: -2.1, rating: "warning" },
  { label: "Poor", value: "10%", trend: -3.1, rating: "poor" },
];

export const DEVICE_ROWS: DeviceRow[] = [
  {
    device: "Desktop",
    sessions: 6842,
    percentage: 53,
    lcp: "1.8s",
    inp: "165ms",
    cls: "0.03",
    rating: "good",
  },
  {
    device: "Mobile",
    sessions: 4923,
    percentage: 38,
    lcp: "3.2s",
    inp: "280ms",
    cls: "0.09",
    rating: "poor",
  },
  {
    device: "Tablet",
    sessions: 1082,
    percentage: 9,
    lcp: "2.1s",
    inp: "195ms",
    cls: "0.05",
    rating: "warning",
  },
];

export const CONNECTION_DATA: ConnectionItem[] = [
  { name: "WiFi", value: 45, color: "#00d084" },
  { name: "4G", value: 35, color: "#3b82f6" },
  { name: "3G", value: 15, color: "#f59e0b" },
  { name: "2G", value: 5, color: "#ef4444" },
];

export const BROWSER_ROWS: BrowserRow[] = [
  { browser: "Chrome", percentage: 68, lcp: "1.9s", rating: "good" },
  { browser: "Safari", percentage: 18, lcp: "2.8s", rating: "warning" },
  { browser: "Firefox", percentage: 10, lcp: "2.1s", rating: "good" },
  { browser: "Edge", percentage: 4, lcp: "2.0s", rating: "good" },
];

export const GEO_ROWS: GeoRow[] = [
  { region: "Taiwan", sessions: 5823, lcp: "1.8s", rating: "good" },
  { region: "Japan", sessions: 2945, lcp: "2.0s", rating: "good" },
  { region: "United States", sessions: 1432, lcp: "3.5s", rating: "warning" },
  { region: "Europe", sessions: 876, lcp: "4.2s", rating: "poor" },
  { region: "Others", sessions: 1771, lcp: "2.6s", rating: "warning" },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const generateHeatmap = (): HeatmapCell[] => {
  const cells: HeatmapCell[] = [];
  DAYS.forEach((day) => {
    HOURS.forEach((hour) => {
      const isWeekend = day === "Sat" || day === "Sun";
      const isPeakHour = hour >= 18 && hour <= 22;
      const isMorning = hour >= 8 && hour <= 10;
      let rating: Rating;
      let value: number;

      if (isPeakHour || (isWeekend && hour >= 12)) {
        rating = "poor";
        value = 3.8 + Math.random() * 0.8;
      } else if (isMorning || (isWeekend && hour >= 8)) {
        rating = "warning";
        value = 2.5 + Math.random() * 0.5;
      } else if (hour < 6) {
        rating = "good";
        value = 1.4 + Math.random() * 0.4;
      } else {
        rating = "good";
        value = 1.8 + Math.random() * 0.4;
      }

      cells.push({ day, hour, rating, value });
    });
  });
  return cells;
};

export const HEATMAP_DATA = generateHeatmap();

export const SITES: Site[] = [
  { id: "1", name: "blog.example.com", status: "good" },
  { id: "2", name: "store.example.com", status: "warning" },
];

export const RATING_LABEL: Record<Rating, string> = {
  good: "Good",
  warning: "Warning",
  poor: "Poor",
};
