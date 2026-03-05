import React, { useState } from 'react';
import clsx from 'clsx';
import * as styles from './Performance.module.scss';
import { Rating } from '../../types/metrics';

export interface PageRow {
  url: string;
  visits: number;
  lcp: { value: string; rating: Rating };
  inp: { value: string; rating: Rating };
  cls: { value: string; rating: Rating };
  score: Rating;
}

type SortKey = 'url' | 'visits' | 'lcp' | 'inp' | 'cls' | 'score';

const RATING_LABEL: Record<Rating, string> = {
  good: 'Good',
  warning: 'Warning',
  poor: 'Poor',
};

const IconSort = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2L9 5H3L6 2Z" fill="currentColor" />
    <path d="M6 10L3 7H9L6 10Z" fill="currentColor" />
  </svg>
);

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'url',    label: 'Page URL' },
  { key: 'visits', label: 'Visits'   },
  { key: 'lcp',    label: 'LCP P75'  },
  { key: 'inp',    label: 'INP P75'  },
  { key: 'cls',    label: 'CLS P75'  },
  { key: 'score',  label: 'Score'    },
];

const PageBreakdownTable: React.FC<{ rows: PageRow[] }> = ({ rows }) => {
  const [sortKey, setSortKey] = useState<SortKey>('lcp');

  const sortedRows = [...rows].sort((a, b) => {
    if (sortKey === 'visits') return b.visits - a.visits;
    if (sortKey === 'lcp') return parseFloat(a.lcp.value) - parseFloat(b.lcp.value);
    if (sortKey === 'inp') return parseFloat(a.inp.value) - parseFloat(b.inp.value);
    if (sortKey === 'cls') return parseFloat(a.cls.value) - parseFloat(b.cls.value);
    return 0;
  });

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>Page Breakdown</h2>
        <span className={styles.tableCount}>{rows.length} pages</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={clsx(styles.th, { [styles.thActive]: sortKey === col.key })}
                  onClick={() => setSortKey(col.key)}
                >
                  <span>{col.label}</span>
                  <span className={styles.sortIcon}><IconSort /></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => (
              <tr
                key={i}
                className={clsx(styles.row, { [styles['row--poor']]: row.score === 'poor' })}
              >
                <td className={styles.tdUrl}>{row.url}</td>
                <td className={styles.tdVisits}>{row.visits.toLocaleString()}</td>
                <td><span className={clsx(styles.badge, styles[`badge--${row.lcp.rating}`])}>{row.lcp.value}</span></td>
                <td><span className={clsx(styles.badge, styles[`badge--${row.inp.rating}`])}>{row.inp.value}</span></td>
                <td><span className={clsx(styles.badge, styles[`badge--${row.cls.rating}`])}>{row.cls.value}</span></td>
                <td><span className={clsx(styles.badge, styles[`badge--${row.score}`])}>{RATING_LABEL[row.score]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageBreakdownTable;
