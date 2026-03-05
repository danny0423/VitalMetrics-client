import React from 'react';
import clsx from 'clsx';
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
import * as styles from './TrendChart.module.scss';
import { ChartPoint } from '../../types/metrics';

interface TrendChartProps {
  data: ChartPoint[];
  activeLine: string | null;
  onLineToggle: (line: string) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTime}>{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: entry.color }} />
          <span className={styles.tooltipLabel}>{entry.name.toUpperCase()}</span>
          <span className={styles.tooltipValue}>
            {entry.value}{entry.dataKey === 'lcp' ? 's' : 'ms'}
          </span>
        </div>
      ))}
    </div>
  );
};

const TrendChart: React.FC<TrendChartProps> = ({ data, activeLine, onLineToggle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Performance Trends</h2>
        <div className={styles.legend}>
          {(['lcp', 'inp'] as const).map((key) => (
            <button
              key={key}
              className={clsx(styles.legendItem, { [styles.legendItemDim]: activeLine && activeLine !== key })}
              onClick={() => onLineToggle(key)}
            >
              <span className={styles.legendDot} style={{ background: key === 'lcp' ? '#00d084' : '#f59e0b' }} />
              <span>{key.toUpperCase()}</span>
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
          <Line
            type="monotone" dataKey="lcp" name="lcp" stroke="#00d084" strokeWidth={2}
            dot={false} activeDot={{ r: 4, fill: '#00d084' }}
            opacity={activeLine && activeLine !== 'lcp' ? 0.2 : 1}
          />
          <Line
            type="monotone" dataKey="inp" name="inp" stroke="#f59e0b" strokeWidth={2}
            dot={false} activeDot={{ r: 4, fill: '#f59e0b' }}
            opacity={activeLine && activeLine !== 'inp' ? 0.2 : 1}
            yAxisId={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
