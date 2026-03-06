import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import * as styles from './Sidebar.module.scss';
import { Rating } from '../../types/metrics';

interface SideItem {
  id: string;
  name: string;
  status: Rating;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
  selectedSite: string;
  onSiteChange: (name: string) => void;
  navItems: NavItem[];
  sites: SideItem[];
}

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
  </svg>
);

const IconPerformance = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 12L5 7L8 9.5L11 5L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAnalytics = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="8" width="3" height="7" rx="1" fill="currentColor" />
    <rect x="6" y="5" width="3" height="10" rx="1" fill="currentColor" />
    <rect x="11" y="2" width="3" height="13" rx="1" fill="currentColor" />
  </svg>
);

const IconAlerts = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1L10.5 6H14L11 9.5L12.5 14L8 11.5L3.5 14L5 9.5L2 6H5.5L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const defaultNavItems: NavItem[] = [
  { id: 'dashboard',   label: 'Dashboard',   icon: <IconDashboard /> },
  { id: 'performance', label: 'Performance', icon: <IconPerformance /> },
  { id: 'analytics',  label: 'Analytics',   icon: <IconAnalytics /> },
  { id: 'alerts',     label: 'Alerts',      icon: <IconAlerts /> },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onNavChange,
  selectedSite,
  onSiteChange,
  navItems,
  sites,
}) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="#0a0a0f" stroke="#00d084" strokeWidth="1.2" />
            <circle cx="7" cy="7" r="2" fill="#00d084" />
          </svg>
        </div>
        <span className={styles.logoText}>VitalMetrics</span>
      </div>

      <nav className={styles.nav}>
        <span className={styles.navLabel}>Navigation</span>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => clsx(styles.navItem, { [styles.navItemActive]: isActive })}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <span className={clsx(styles.navLabel, styles.navLabelSpaced)}>Sites</span>
        {sites.map((site) => (
          <button
            key={site.id}
            className={clsx(styles.siteItem, { [styles.siteItemActive]: selectedSite === site.name })}
            onClick={() => onSiteChange(site.name)}
          >
            <span className={clsx(styles.siteDot, styles[`siteDot${site.status.charAt(0).toUpperCase() + site.status.slice(1)}`])} />
            <span className={styles.siteName}>{site.name}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        <NavLink className={styles.navItem} to={`/settings`}>
          <span className={styles.navIcon}><IconSettings /></span>
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
