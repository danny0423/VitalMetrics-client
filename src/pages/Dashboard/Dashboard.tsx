import React, { useState } from 'react';
import * as styles from './Dashboard.module.scss';
import Sidebar, { defaultNavItems } from '../../components/Sidebar/Sidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import MetricCard from '../../components/MetricCard/MetricCard';
import TrendChart from '../../components/TrendChart/TrendChart';
import MetricsTable from '../../components/MetricsTable/MetricsTable';
import { MetricData, ChartPoint, TableRow, Rating } from '../../types/metrics';

// ── Mock Data ──────────────────────────────────────────────────────────────

const metrics: MetricData[] = [
  { label: 'LCP', value: '1.8', unit: 's',  rating: 'good',    trend: -8.3, trendLabel: 'vs last week' },
  { label: 'INP', value: '210', unit: 'ms', rating: 'warning', trend:  7.1, trendLabel: 'vs last week' },
  { label: 'CLS', value: '0.04', unit: '',  rating: 'good',    trend: -3.5, trendLabel: 'vs last week' },
];

const chartData: ChartPoint[] = [
  { time: '00:00', lcp: 2.1, inp: 190 },
  { time: '02:00', lcp: 1.9, inp: 210 },
  { time: '04:00', lcp: 2.3, inp: 230 },
  { time: '06:00', lcp: 1.7, inp: 195 },
  { time: '08:00', lcp: 2.0, inp: 220 },
  { time: '10:00', lcp: 1.8, inp: 205 },
  { time: '12:00', lcp: 2.2, inp: 240 },
  { time: '14:00', lcp: 1.6, inp: 188 },
  { time: '16:00', lcp: 1.9, inp: 215 },
  { time: '18:00', lcp: 2.4, inp: 250 },
  { time: '20:00', lcp: 1.8, inp: 200 },
  { time: '22:00', lcp: 1.7, inp: 195 },
];

const tableRows: TableRow[] = [
  { time: '14:32', url: '/products/macbook-pro-m3',   lcp: { value: '2.1s',  rating: 'good' },    inp: { value: '180ms', rating: 'good' },    cls: { value: '0.03', rating: 'good' } },
  { time: '14:29', url: '/checkout/step2',             lcp: { value: '3.8s',  rating: 'poor' },    inp: { value: '320ms', rating: 'poor' },    cls: { value: '0.12', rating: 'warning' } },
  { time: '14:25', url: '/blog/web-performance',       lcp: { value: '2.4s',  rating: 'warning' }, inp: { value: '210ms', rating: 'warning' }, cls: { value: '0.05', rating: 'good' } },
  { time: '14:21', url: '/update-performance-topic',   lcp: { value: '1.6s',  rating: 'good' },    inp: { value: '155ms', rating: 'good' },    cls: { value: '0.02', rating: 'good' } },
];

const sitesList = [
  { id: '1', name: 'blog.example.com',  status: 'good'    as Rating },
  { id: '2', name: 'store.example.com', status: 'warning' as Rating },
];

// ── Page ───────────────────────────────────────────────────────────────────

const Dashboard: React.FC = () => {
  const [activeNav,     setActiveNav]     = useState('dashboard');
  const [selectedSite,  setSelectedSite]  = useState(sitesList[0].name);
  const [selectedRange, setSelectedRange] = useState('7d');
  const [activeLine,    setActiveLine]    = useState<string | null>(null);

  const handleLineToggle = (line: string) =>
    setActiveLine((prev) => (prev === line ? null : line));

  return (
    <div className={styles.page}>
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        selectedSite={selectedSite}
        onSiteChange={setSelectedSite}
        navItems={defaultNavItems}
        sites={sitesList}
      />

      <div className={styles.main}>
        <PageHeader
          selectedSite={selectedSite}
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
        />

        <div className={styles.body}>
          <div className={styles.metricGrid}>
            {metrics.map((m) => <MetricCard key={m.label} metric={m} />)}
          </div>

          <TrendChart
            data={chartData}
            activeLine={activeLine}
            onLineToggle={handleLineToggle}
          />

          <MetricsTable rows={tableRows} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
