import React from 'react';
import clsx from 'clsx';
import * as styles from './MetricCard.module.scss';
import { MetricData, Rating } from '../../types/metrics';

const IconTrendUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 9L4.5 5.5L7 8L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 3h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTrendDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 3L4.5 6.5L7 4L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 9h3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ratingLabel: Record<Rating, string> = {
  good: 'Good',
  warning: 'Needs Improvement',
  poor: 'Poor',
};

interface MetricCardProps {
  metric: MetricData;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const trendIsGood = metric.trend < 0;

  return (
    <div className={clsx(styles.card, styles[`card${cap(metric.rating)}`])}>
      <div className={styles.header}>
        <span className={styles.label}>{metric.label}</span>
        <span className={clsx(styles.badge, styles[`badge${cap(metric.rating)}`])}>
          {ratingLabel[metric.rating]}
        </span>
      </div>
      <div className={styles.value}>
        {metric.value}
        <span className={styles.unit}>{metric.unit}</span>
      </div>
      <div className={clsx(styles.trend, { [styles.trendGood]: trendIsGood, [styles.trendBad]: !trendIsGood })}>
        {trendIsGood ? <IconTrendDown /> : <IconTrendUp />}
        <span>{Math.abs(metric.trend)}% {metric.trendLabel}</span>
      </div>
    </div>
  );
};

export default MetricCard;
