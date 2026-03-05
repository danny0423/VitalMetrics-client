import React, { useState } from 'react';
import clsx from 'clsx';
import * as styles from './Performance.module.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export interface ChartPoint {
  time: string;
  p50: number;
  p75: number;
  p90: number;
}

const chartLines = [
  { key: 'p50', color: '#55556a', label: 'P50' },
  { key: 'p75', color: '#00d084', label: 'P75' },
  { key: 'p90', color: '#f59e0b', label: 'P90' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTime}>{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: entry.color }} />
          <span className={styles.tooltipLabel}>{entry.name.toUpperCase()}</span>
          <span className={styles.tooltipValue}>{entry.value}s</span>
        </div>
      ))}
    </div>
  );
};

const PercentileTrendsChart: React.FC<{ data: ChartPoint[] }> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const toggleMetric = (key: string) =>
    setActiveMetric((prev) => (prev === key ? null : key));

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>Percentile Trends</h2>
        <div className={styles.chartLegend}>
          {chartLines.map((line) => (
            <button
              key={line.key}
              className={clsx(styles.chartLegendItem, {
                [styles.chartLegendItemDim]: activeMetric && activeMetric !== line.key,
              })}
              onClick={() => toggleMetric(line.key)}
            >
              <span className={styles.chartLegendDot} style={{ background: line.color }} />
              <span>{line.label}</span>
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a38" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={2.5} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.4} />
          {chartLines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.key}
              stroke={line.color}
              strokeWidth={line.key === 'p75' ? 2 : 1.5}
              dot={false}
              activeDot={{ r: 4, fill: line.color }}
              opacity={activeMetric && activeMetric !== line.key ? 0.15 : 1}
              strokeDasharray={line.key === 'p50' ? '4 4' : undefined}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentileTrendsChart;
