import React from "react";
import { NotifyType } from "./data";

export const IconEmail = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1 4.5L7 8.5L13 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const IconSlack = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="5" width="3" height="5" rx="1.5" fill="currentColor" />
    <rect x="5" y="1" width="3" height="5" rx="1.5" fill="currentColor" />
    <rect x="9" y="5" width="3" height="5" rx="1.5" fill="currentColor" />
    <rect x="5" y="9" width="3" height="5" rx="1.5" fill="currentColor" />
  </svg>
);

export const IconWebhook = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 7C5 5.9 5.9 5 7 5s2 .9 2 2-.9 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M2 7C2 4.2 4.2 2 7 2s5 2.2 5 5-2.2 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

export const IconDelete = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5h6.4L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const NOTIFY_ICON: Record<NotifyType, React.ReactNode> = {
  email: <IconEmail />,
  slack: <IconSlack />,
  webhook: <IconWebhook />,
};
