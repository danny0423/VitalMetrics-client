import React from "react";
import clsx from "clsx";
import * as styles from "./AlertRules.module.scss";
import { AlertRule } from "../../data";
import { NOTIFY_ICON, IconEdit, IconDelete, IconPlus } from "../../icons";

interface Props {
  rules: AlertRule[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onNewAlert: () => void;
}

const AlertRules: React.FC<Props> = ({ rules, onToggle, onDelete, onNewAlert }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>Alert Rules</h2>
        <span className={styles.count}>{rules.length}</span>
      </div>
      <button className={styles.newBtn} onClick={onNewAlert}>
        <IconPlus />
        <span>New Alert</span>
      </button>
    </div>

    <div className={styles.list}>
      {rules.map((rule) => (
        <div
          key={rule.id}
          className={clsx(styles.row, { [styles["row--inactive"]]: !rule.isActive })}
        >
          <button
            className={clsx(styles.toggle, { [styles["toggle--active"]]: rule.isActive })}
            onClick={() => onToggle(rule.id)}
          >
            <span className={styles.toggleThumb} />
          </button>

          <div className={styles.info}>
            <span className={styles.name}>{rule.name}</span>
            <span className={styles.meta}>
              {rule.site} · {rule.metric} {rule.threshold}
            </span>
          </div>

          <span className={clsx(styles.metricBadge, styles[`metricBadge--${rule.metric.toLowerCase()}`])}>
            {rule.metric}
          </span>

          <span className={styles.notifyIcon}>{NOTIFY_ICON[rule.notifyVia]}</span>

          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <IconEdit />
            </button>
            <button
              className={clsx(styles.actionBtn, styles["actionBtn--danger"])}
              onClick={() => onDelete(rule.id)}
            >
              <IconDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AlertRules;
