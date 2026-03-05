import React from 'react';
import clsx from 'clsx';
import * as styles from './PageHeader.module.scss';

const timeRanges = ['1h', '24h', '7d', '30d'];

const IconExport = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface PageHeaderProps {
  selectedSite: string;
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ selectedSite, selectedRange, onRangeChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbSite}>{selectedSite}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.timeRangeGroup}>
          {timeRanges.map((range) => (
            <button
              key={range}
              className={clsx(styles.timeRangeBtn, { [styles.timeRangeBtnActive]: selectedRange === range })}
              onClick={() => onRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
        <button className={styles.exportBtn}>
          <IconExport />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};

export default PageHeader;
