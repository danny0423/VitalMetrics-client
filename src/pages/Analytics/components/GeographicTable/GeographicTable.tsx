import React from "react";
import clsx from "clsx";
import * as styles from "./GeographicTable.module.scss";
import { GeoRow, RATING_LABEL } from "../../data";

interface Props {
  rows: GeoRow[];
}

const GeographicTable: React.FC<Props> = ({ rows }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>Geographic</h2>
    </div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Region</th>
          <th>Sessions</th>
          <th>LCP P75</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.region} className={styles.row}>
            <td className={styles.region}>{row.region}</td>
            <td className={styles.sessions}>{row.sessions.toLocaleString()}</td>
            <td className={styles.lcp}>{row.lcp}</td>
            <td>
              <span className={clsx(styles.badge, styles[`badge--${row.rating}`])}>
                {RATING_LABEL[row.rating]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default GeographicTable;
