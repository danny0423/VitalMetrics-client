import { Site } from "../../types/metrics";

// ============================================
// Types
// ============================================
export type MetricType = "LCP" | "INP" | "CLS";
export type NotifyType = "email" | "slack" | "webhook";

export interface AlertRule {
  id: string;
  name: string;
  site: string;
  metric: MetricType;
  threshold: string;
  notifyVia: NotifyType;
  isActive: boolean;
}

export interface TriggerHistory {
  id: string;
  time: string;
  ruleName: string;
  metric: MetricType;
  triggeredValue: string;
  status: "sent" | "failed";
}

export interface NewAlertForm {
  name: string;
  site: string;
  metric: MetricType;
  threshold: string;
  cooldown: string;
  notifyVia: NotifyType;
  recipient: string;
}

// ============================================
// Mock Data
// ============================================
export const ALERT_RULES: AlertRule[] = [
  {
    id: "1",
    name: "LCP Critical Alert",
    site: "blog.example.com",
    metric: "LCP",
    threshold: "> 2.5s",
    notifyVia: "email",
    isActive: true,
  },
  {
    id: "2",
    name: "INP Warning",
    site: "blog.example.com",
    metric: "INP",
    threshold: "> 200ms",
    notifyVia: "slack",
    isActive: true,
  },
  {
    id: "3",
    name: "CLS Layout Shift",
    site: "store.example.com",
    metric: "CLS",
    threshold: "> 0.1",
    notifyVia: "email",
    isActive: false,
  },
  {
    id: "4",
    name: "INP Mobile Spike",
    site: "store.example.com",
    metric: "INP",
    threshold: "> 300ms",
    notifyVia: "webhook",
    isActive: true,
  },
];

export const TRIGGER_HISTORY: TriggerHistory[] = [
  {
    id: "1",
    time: "2 hrs ago",
    ruleName: "LCP Critical Alert",
    metric: "LCP",
    triggeredValue: "3.8s",
    status: "sent",
  },
  {
    id: "2",
    time: "5 hrs ago",
    ruleName: "INP Warning",
    metric: "INP",
    triggeredValue: "285ms",
    status: "sent",
  },
  {
    id: "3",
    time: "1 day ago",
    ruleName: "CLS Layout Shift",
    metric: "CLS",
    triggeredValue: "0.15",
    status: "sent",
  },
  {
    id: "4",
    time: "2 days ago",
    ruleName: "LCP Critical Alert",
    metric: "LCP",
    triggeredValue: "4.1s",
    status: "failed",
  },
  {
    id: "5",
    time: "3 days ago",
    ruleName: "INP Mobile Spike",
    metric: "INP",
    triggeredValue: "420ms",
    status: "sent",
  },
  {
    id: "6",
    time: "5 days ago",
    ruleName: "INP Warning",
    metric: "INP",
    triggeredValue: "310ms",
    status: "sent",
  },
];

export const SITES: Site[] = [
  { id: "1", name: "blog.example.com", status: "good" },
  { id: "2", name: "store.example.com", status: "warning" },
];

export const COOLDOWN_OPTIONS = ["15 minutes", "1 hour", "6 hours", "24 hours"];

export const METRIC_UNITS: Record<MetricType, string> = {
  LCP: "s",
  INP: "ms",
  CLS: "",
};

export const DEFAULT_FORM: NewAlertForm = {
  name: "",
  site: "blog.example.com",
  metric: "LCP",
  threshold: "",
  cooldown: "15 minutes",
  notifyVia: "email",
  recipient: "",
};
