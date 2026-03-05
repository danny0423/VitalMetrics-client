import React from 'react';
import clsx from 'clsx';
import * as styles from './MetricsTable.module.scss';
import { TableRow } from '../../types/metrics';

interface MetricsTableProps {
  rows: TableRow[];
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MetricsTable: React.FC<MetricsTableProps> = ({ rows }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Recent Measurements</h2>
        <span className={styles.cardCount}>{rows.length} entries</span>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Time</th>
              <th>URL</th>
              <th>LCP</th>
              <th>INP</th>
              <th>CLS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={styles.row}>
                <td className={styles.time}>{row.time}</td>
                <td className={styles.url}>{row.url}</td>
                <td>
                  <span className={clsx(styles.badge, styles[`badge${cap(row.lcp.rating)}`])}>
                    {row.lcp.value}
                  </span>
                </td>
                <td>
                  <span className={clsx(styles.badge, styles[`badge${cap(row.inp.rating)}`])}>
                    {row.inp.value}
                  </span>
                </td>
                <td>
                  <span className={clsx(styles.badge, styles[`badge${cap(row.cls.rating)}`])}>
                    {row.cls.value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsTable;
