import React from "react";
import clsx from "clsx";
import * as styles from "./BrowserBreakdown.module.scss";
import { BrowserRow } from "../../data";

interface Props {
  rows: BrowserRow[];
}

const BrowserBreakdown: React.FC<Props> = ({ rows }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>Browser Breakdown</h2>
    </div>
    <div className={styles.list}>
      {rows.map((row) => (
        <div key={row.browser} className={styles.row}>
          <span className={styles.name}>{row.browser}</span>
          <div className={styles.bar}>
            <div
              className={clsx(styles.barFill, styles[`barFill--${row.rating}`])}
              style={{ width: `${row.percentage}%` }}
            />
          </div>
          <span className={styles.pct}>{row.percentage}%</span>
          <span className={clsx(styles.lcp, styles[`lcp--${row.rating}`])}>
            {row.lcp}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default BrowserBreakdown;
