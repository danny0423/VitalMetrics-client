import React, { useState } from 'react';
import * as styles from './Performance.module.scss';
import { Site } from '../../types/metrics';
import Sidebar, { defaultNavItems } from '@/components/Sidebar/Sidebar';
import PageHeader from '@/components/PageHeader/PageHeader';
import DistributionCard, { DistributionMetric } from './DistributionCard';
import PercentileTrendsChart, { ChartPoint } from './PercentileTrendsChart';
import PageBreakdownTable, { PageRow } from './PageBreakdownTable';

// ============================================
// Mock Data
// ============================================
const DISTRIBUTION_METRICS: DistributionMetric[] = [
  { label: 'LCP', good: 65, warning: 20, poor: 15, p50: '1.6s',  p75: '2.1s',  p90: '3.4s',  unit: 's'  },
  { label: 'INP', good: 52, warning: 30, poor: 18, p50: '145ms', p75: '210ms', p90: '380ms', unit: 'ms' },
  { label: 'CLS', good: 78, warning: 15, poor: 7,  p50: '0.02',  p75: '0.06',  p90: '0.18',  unit: ''   },
];

const CHART_DATA: ChartPoint[] = [
  { time: '00:00', p50: 1.4, p75: 1.9, p90: 2.8 },
  { time: '02:00', p50: 1.5, p75: 2.0, p90: 3.1 },
  { time: '04:00', p50: 1.6, p75: 2.2, p90: 3.4 },
  { time: '06:00', p50: 1.3, p75: 1.8, p90: 2.6 },
  { time: '08:00', p50: 1.7, p75: 2.3, p90: 3.6 },
  { time: '10:00', p50: 1.5, p75: 2.0, p90: 3.0 },
  { time: '12:00', p50: 1.8, p75: 2.4, p90: 3.8 },
  { time: '14:00', p50: 1.4, p75: 1.9, p90: 2.9 },
  { time: '16:00', p50: 1.6, p75: 2.1, p90: 3.2 },
  { time: '18:00', p50: 1.9, p75: 2.5, p90: 4.0 },
  { time: '20:00', p50: 1.5, p75: 2.0, p90: 3.1 },
  { time: '22:00', p50: 1.4, p75: 1.8, p90: 2.7 },
];

const PAGE_ROWS: PageRow[] = [
  { url: '/products/macbook-pro-m3',      visits: 4823, lcp: { value: '2.1s',  rating: 'good'    }, inp: { value: '180ms', rating: 'good'    }, cls: { value: '0.03', rating: 'good'    }, score: 'good'    },
  { url: '/checkout/step2',               visits: 2341, lcp: { value: '3.8s',  rating: 'poor'    }, inp: { value: '320ms', rating: 'poor'    }, cls: { value: '0.12', rating: 'warning' }, score: 'poor'    },
  { url: '/blog/web-performance',         visits: 3102, lcp: { value: '2.4s',  rating: 'warning' }, inp: { value: '210ms', rating: 'warning' }, cls: { value: '0.05', rating: 'good'    }, score: 'warning' },
  { url: '/about',                        visits: 1205, lcp: { value: '1.7s',  rating: 'good'    }, inp: { value: '140ms', rating: 'good'    }, cls: { value: '0.01', rating: 'good'    }, score: 'good'    },
  { url: '/blog/top-10-javascript-tips',  visits: 5540, lcp: { value: '3.2s',  rating: 'poor'    }, inp: { value: '275ms', rating: 'warning' }, cls: { value: '0.09', rating: 'warning' }, score: 'poor'    },
  { url: '/update-performance-topic',     visits: 987,  lcp: { value: '1.6s',  rating: 'good'    }, inp: { value: '155ms', rating: 'good'    }, cls: { value: '0.02', rating: 'good'    }, score: 'good'    },
];

const SITES: Site[] = [
  { id: '1', name: 'blog.example.com',  status: 'good'    },
  { id: '2', name: 'store.example.com', status: 'warning' },
];

// ============================================
// Performance Page
// ============================================
const Performance: React.FC = () => {
  const [selectedSite,  setSelectedSite]  = useState(SITES[0].name);
  const [selectedRange, setSelectedRange] = useState('7d');

  return (
    <div className={styles.page}>
      <Sidebar
        activeNav="performance"
        onNavChange={() => {}}
        navItems={defaultNavItems}
        sites={SITES}
        selectedSite={selectedSite}
        onSiteChange={setSelectedSite}
      />

      <div className={styles.main}>
        <PageHeader
          title="Performance"
          breadcrumb={selectedSite}
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
          onExport={() => console.log('export')}
        />

        <div className={styles.body}>
          <div className={styles.distGrid}>
            {DISTRIBUTION_METRICS.map((metric) => (
              <DistributionCard key={metric.label} metric={metric} />
            ))}
          </div>

          <PercentileTrendsChart data={CHART_DATA} />

          <PageBreakdownTable rows={PAGE_ROWS} />
        </div>
      </div>
    </div>
  );
};

export default Performance;
