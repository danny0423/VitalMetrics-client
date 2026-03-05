import React from 'react';
import clsx from 'clsx';
import * as styles from './Performance.module.scss';

export interface DistributionMetric {
  label: string;
  good: number;
  warning: number;
  poor: number;
  p50: string;
  p75: string;
  p90: string;
  unit: string;
}

const DistributionCard: React.FC<{ metric: DistributionMetric }> = ({ metric }) => (
  <div className={styles.distCard}>
    <div className={styles.distHeader}>
      <span className={styles.distLabel}>{metric.label}</span>
      <span className={styles.distSubLabel}>
        P75 threshold:{' '}
        {metric.label === 'LCP' ? '2.5s' : metric.label === 'INP' ? '200ms' : '0.1'}
      </span>
    </div>

    <div className={styles.distBar}>
      <div className={clsx(styles.distBarSegment, styles['distBarSegment--good'])} style={{ width: `${metric.good}%` }} />
      <div className={clsx(styles.distBarSegment, styles['distBarSegment--warning'])} style={{ width: `${metric.warning}%` }} />
      <div className={clsx(styles.distBarSegment, styles['distBarSegment--poor'])} style={{ width: `${metric.poor}%` }} />
    </div>

    <div className={styles.distBarLegend}>
      <span className={clsx(styles.distBarLegendItem, styles['distBarLegendItem--good'])}>Good {metric.good}%</span>
      <span className={clsx(styles.distBarLegendItem, styles['distBarLegendItem--warning'])}>NI {metric.warning}%</span>
      <span className={clsx(styles.distBarLegendItem, styles['distBarLegendItem--poor'])}>Poor {metric.poor}%</span>
    </div>

    <div className={styles.distPercentiles}>
      {[
        { label: 'P50', value: metric.p50 },
        { label: 'P75', value: metric.p75 },
        { label: 'P90', value: metric.p90 },
      ].map((p) => (
        <div key={p.label} className={styles.distPercentileItem}>
          <span className={styles.distPercentileLabel}>{p.label}</span>
          <span className={styles.distPercentileValue}>{p.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DistributionCard;
