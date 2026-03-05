import React from "react";
import clsx from "clsx";
import * as styles from "./TriggerHistory.module.scss";
import { TriggerHistory as TriggerHistoryType } from "../../data";

interface Props {
  history: TriggerHistoryType[];
}

const TriggerHistory: React.FC<Props> = ({ history }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>Recent Triggers</h2>
        <span className={styles.count}>{history.length}</span>
      </div>
    </div>

    <table className={styles.table}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Rule</th>
          <th>Metric</th>
          <th>Value</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item.id} className={styles.row}>
            <td className={styles.time}>{item.time}</td>
            <td className={styles.rule}>{item.ruleName}</td>
            <td>
              <span className={clsx(styles.metricBadge, styles[`metricBadge--${item.metric.toLowerCase()}`])}>
                {item.metric}
              </span>
            </td>
            <td className={styles.value}>{item.triggeredValue}</td>
            <td>
              <span className={clsx(styles.statusBadge, styles[`statusBadge--${item.status}`])}>
                {item.status === "sent" ? "Sent" : "Failed"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TriggerHistory;
