import React from "react";
import clsx from "clsx";
import * as styles from "./NewAlertPanel.module.scss";
import {
  NewAlertForm,
  MetricType,
  NotifyType,
  COOLDOWN_OPTIONS,
  METRIC_UNITS,
  SITES,
} from "../../data";
import { NOTIFY_ICON, IconClose } from "../../icons";

interface Props {
  form: NewAlertForm;
  onFormChange: (field: keyof NewAlertForm, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const NewAlertPanel: React.FC<Props> = ({ form, onFormChange, onSave, onClose }) => (
  <div className={styles.panel}>
    <div className={styles.header}>
      <h2 className={styles.title}>New Alert Rule</h2>
      <button className={styles.closeBtn} onClick={onClose}>
        <IconClose />
      </button>
    </div>

    <div className={styles.body}>
      {/* Rule Name */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Rule Name</label>
        <input
          className={styles.input}
          placeholder="e.g. LCP Critical Alert"
          value={form.name}
          onChange={(e) => onFormChange("name", e.target.value)}
        />
      </div>

      {/* Site */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Site</label>
        <select
          className={styles.select}
          value={form.site}
          onChange={(e) => onFormChange("site", e.target.value)}
        >
          {SITES.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Metric */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Metric</label>
        <div className={styles.metricToggle}>
          {(["LCP", "INP", "CLS"] as MetricType[]).map((m) => (
            <button
              key={m}
              className={clsx(styles.metricToggleBtn, {
                [styles.metricToggleBtnActive]: form.metric === m,
              })}
              onClick={() => onFormChange("metric", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Threshold */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Threshold</label>
        <div className={styles.thresholdRow}>
          <span className={styles.thresholdPrefix}>{">"}</span>
          <input
            className={styles.input}
            placeholder={form.metric === "LCP" ? "2.5" : form.metric === "INP" ? "200" : "0.1"}
            value={form.threshold}
            onChange={(e) => onFormChange("threshold", e.target.value)}
          />
          <span className={styles.thresholdUnit}>{METRIC_UNITS[form.metric]}</span>
        </div>
      </div>

      {/* Cooldown */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Cooldown</label>
        <select
          className={styles.select}
          value={form.cooldown}
          onChange={(e) => onFormChange("cooldown", e.target.value)}
        >
          {COOLDOWN_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Notify Via */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Notify Via</label>
        <div className={styles.notifyTabs}>
          {(["email", "slack", "webhook"] as NotifyType[]).map((t) => (
            <button
              key={t}
              className={clsx(styles.notifyTab, {
                [styles.notifyTabActive]: form.notifyVia === t,
              })}
              onClick={() => onFormChange("notifyVia", t)}
            >
              {NOTIFY_ICON[t]}
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recipient */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          {form.notifyVia === "email" ? "Email Address" : "Webhook URL"}
        </label>
        <input
          className={styles.input}
          placeholder={form.notifyVia === "email" ? "you@example.com" : "https://hooks.slack.com/..."}
          value={form.recipient}
          onChange={(e) => onFormChange("recipient", e.target.value)}
        />
      </div>
    </div>

    <div className={styles.footer}>
      <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
      <button className={styles.saveBtn} onClick={onSave}>Save Rule</button>
    </div>
  </div>
);

export default NewAlertPanel;
