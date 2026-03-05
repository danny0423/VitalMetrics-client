import React from "react";
import clsx from "clsx";
import * as styles from "./PerformanceHeatmap.module.scss";
import { DAYS, HOURS, HEATMAP_DATA } from "../../data";

interface Props {
  selectedMetric: "LCP" | "INP" | "CLS";
  onMetricChange: (metric: "LCP" | "INP" | "CLS") => void;
}

const METRICS = ["LCP", "INP", "CLS"] as const;

const PerformanceHeatmap: React.FC<Props> = ({ selectedMetric, onMetricChange }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h2 className={styles.cardTitle}>Performance Heatmap</h2>
      <div className={styles.metricSelector}>
        {METRICS.map((m) => (
          <button
            key={m}
            className={clsx(styles.metricBtn, {
              [styles.metricBtnActive]: selectedMetric === m,
            })}
            onClick={() => onMetricChange(m)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>

    <div className={styles.heatmap}>
      {/* Day labels */}
      <div className={styles.days}>
        <div className={styles.hourLabel} />
        {DAYS.map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {HOURS.map((hour) => (
          <div key={hour} className={styles.row}>
            <div className={styles.hourLabel}>
              {hour % 6 === 0 ? `${String(hour).padStart(2, "0")}:00` : ""}
            </div>
            {DAYS.map((day) => {
              const cell = HEATMAP_DATA.find(
                (c) => c.day === day && c.hour === hour,
              );
              return (
                <div
                  key={day}
                  className={clsx(styles.cell, {
                    [styles["cell--good"]]: cell?.rating === "good",
                    [styles["cell--warning"]]: cell?.rating === "warning",
                    [styles["cell--poor"]]: cell?.rating === "poor",
                  })}
                  title={`${day} ${String(hour).padStart(2, "0")}:00 — ${cell?.value.toFixed(1)}s`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.legendLabel}>LCP</span>
        <div className={clsx(styles.legendDot, styles["legendDot--good"])} />
        <span className={styles.legendText}>Good</span>
        <div className={clsx(styles.legendDot, styles["legendDot--warning"])} />
        <span className={styles.legendText}>Needs Improvement</span>
        <div className={clsx(styles.legendDot, styles["legendDot--poor"])} />
        <span className={styles.legendText}>Poor</span>
      </div>
    </div>
  </div>
);

export default PerformanceHeatmap;
