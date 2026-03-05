import React from "react";
import * as styles from "./AlertSummary.module.scss";

interface Props {
  activeCount: number;
  triggeredToday: number;
}

const AlertSummary: React.FC<Props> = ({ activeCount, triggeredToday }) => (
  <div className={styles.row}>
    <div className={styles.card}>
      <span className={styles.value}>{activeCount}</span>
      <span className={styles.label}>Active Rules</span>
    </div>
    <div className={styles.card}>
      <span className={styles.value}>{triggeredToday}</span>
      <span className={styles.label}>Triggered Today</span>
    </div>
  </div>
);

export default AlertSummary;
