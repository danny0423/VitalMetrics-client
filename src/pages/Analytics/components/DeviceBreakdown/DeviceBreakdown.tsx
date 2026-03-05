import React from "react";
import clsx from "clsx";
import * as styles from "./DeviceBreakdown.module.scss";
import { DeviceRow } from "../../data";

interface Props {
  rows: DeviceRow[];
}

const DeviceBreakdown: React.FC<Props> = ({ rows }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>Device Breakdown</h2>
    </div>
    <div className={styles.list}>
      {rows.map((row) => (
        <div key={row.device} className={styles.row}>
          <div className={styles.info}>
            <span className={styles.name}>{row.device}</span>
            <span className={styles.sessions}>
              {row.sessions.toLocaleString()} sessions
            </span>
          </div>
          <div className={styles.bar}>
            <div
              className={clsx(styles.barFill, styles[`barFill--${row.rating}`])}
              style={{ width: `${row.percentage}%` }}
            />
          </div>
          <div className={styles.metrics}>
            <span
              className={clsx(
                styles.metricValue,
                styles[`metricValue--${row.rating}`],
              )}
            >
              {row.lcp}
            </span>
            <span className={styles.metricSep}>LCP</span>
            <span className={styles.metricValue}>{row.inp}</span>
            <span className={styles.metricSep}>INP</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DeviceBreakdown;
