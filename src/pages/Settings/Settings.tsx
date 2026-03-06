import React, { useState } from 'react';
import clsx from 'clsx';
import * as styles from './Settings.module.scss';
import { Site } from '../../types/metrics';
import Sidebar, { defaultNavItems } from '../../components/Sidebar/Sidebar';

// ============================================
// Types
// ============================================
type SettingsTab = 'sites' | 'apiKeys' | 'dataRetention' | 'account';

interface SiteItem {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  sdkInstalled: boolean;
  description?: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  environment: 'live' | 'test';
  createdAt: string;
  lastUsed: string;
}

// ============================================
// Mock Data
// ============================================
const SITES_DATA: SiteItem[] = [
  {
    id: '1',
    name: 'Production Shop',
    url: 'shop.example.com',
    isActive: true,
    sdkInstalled: true,
  },
  {
    id: '2',
    name: 'Blog',
    url: 'blog.example.com',
    isActive: false,
    sdkInstalled: false,
    description: 'Content site',
  },
  {
    id: '3',
    name: 'Staging',
    url: 'staging.example.com',
    isActive: true,
    sdkInstalled: true,
    description: 'Test environment',
  },
];

const API_KEYS: ApiKey[] = [
  {
    id: '1',
    name: 'Production',
    key: 'vm_live_a8f3b2',
    environment: 'live',
    createdAt: 'Jan 12, 2024',
    lastUsed: '2 hours ago',
  },
  {
    id: '2',
    name: 'Staging',
    key: 'vm_test_d2c9a1',
    environment: 'test',
    createdAt: 'Feb 3, 2024',
    lastUsed: '5 days ago',
  },
];

const SIDEBAR_SITES: Site[] = [
  { id: '1', name: 'shop.example.com', status: 'good' },
  { id: '2', name: 'blog.example.com', status: 'warning' },
];

const SDK_CODE = `<script
  src="https://cdn.vitalmetrics.io/sdk.js"
  data-site-id="vm_site_d8f3k2"
  data-api-key="vm_live_••••••••••••"
></script>`;

// ============================================
// Icons
// ============================================
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const IconDelete = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5h6.4L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 10V2.5A.5.5 0 012.5 2H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDot = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="4" cy="4" r="3" fill="currentColor" />
  </svg>
);

// ============================================
// Sub Components
// ============================================

// Toggle Switch
const Toggle: React.FC<{ isActive: boolean; onToggle: () => void }> = ({ isActive, onToggle }) => (
  <button
    className={clsx(styles.toggle, { [styles['toggle--active']]: isActive })}
    onClick={onToggle}
  >
    <span className={styles.toggleThumb} />
  </button>
);

// Action Button
const ActionBtn: React.FC<{
  icon: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}> = ({ icon, danger, onClick }) => (
  <button
    className={clsx(styles.actionBtn, { [styles['actionBtn--danger']]: danger })}
    onClick={onClick}
  >
    {icon}
  </button>
);

// ============================================
// Tab Contents
// ============================================

// Sites Tab
const SitesTab: React.FC = () => {
  const [sites, setSites] = useState<SiteItem[]>(SITES_DATA);
  const [copied, setCopied] = useState(false);

  const toggleSite = (id: string) => {
    setSites((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const deleteSite = (id: string) => {
    setSites((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SDK_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.tabContent}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Sites</h2>
          <p className={styles.sectionSubtitle}>Manage your monitored websites</p>
        </div>
        <button className={styles.addBtn}>
          <IconPlus />
          <span>Add Site</span>
        </button>
      </div>

      {/* Sites Table */}
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Site Name</th>
              <th>URL</th>
              <th>Status</th>
              <th>SDK Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className={styles.tableRow}>
                <td>
                  <div className={styles.siteName}>{site.name}</div>
                  {site.description && (
                    <div className={styles.siteDesc}>{site.description}</div>
                  )}
                </td>
                <td className={styles.siteUrl}>{site.url}</td>
                <td>
                  <div className={styles.toggleRow}>
                    <Toggle
                      isActive={site.isActive}
                      onToggle={() => toggleSite(site.id)}
                    />
                    <span className={clsx(styles.toggleLabel, {
                      [styles['toggleLabel--active']]: site.isActive,
                    })}>
                      {site.isActive ? 'On' : 'Off'}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={clsx(styles.sdkBadge, {
                    [styles['sdkBadge--installed']]: site.sdkInstalled,
                    [styles['sdkBadge--notInstalled']]: !site.sdkInstalled,
                  })}>
                    {site.sdkInstalled ? (
                      <><IconCheck /> Installed</>
                    ) : (
                      'Not Installed'
                    )}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <ActionBtn icon={<IconEdit />} />
                    <ActionBtn
                      icon={<IconDelete />}
                      danger
                      onClick={() => deleteSite(site.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SDK Installation */}
      <div className={styles.card}>
        <div className={styles.sdkHeader}>
          <div className={styles.sdkTitleRow}>
            <h3 className={styles.sdkTitle}>SDK Installation</h3>
            <div className={styles.sdkStatus}>
              <span className={styles.sdkStatusDot}><IconDot /></span>
              <span className={styles.sdkStatusText}>Receiving data</span>
            </div>
          </div>
          <p className={styles.sdkSubtitle}>
            Add this code to your website's &lt;head&gt; tag
          </p>
        </div>
        <div className={styles.codeBlock}>
          <pre className={styles.codeText}>{SDK_CODE}</pre>
        </div>
        <div className={styles.sdkFooter}>
          <button className={styles.copyBtn} onClick={handleCopy}>
            <IconCopy />
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* API Keys */}
      <ApiKeysCard />
    </div>
  );
};

// API Keys Card (共用)
const ApiKeysCard: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>(API_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>API Keys</h3>
        <button className={styles.newKeyBtn}>
          <IconPlus />
          <span>New Key</span>
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Key</th>
            <th>Created</th>
            <th>Last Used</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.id} className={styles.tableRow}>
              <td className={styles.keyName}>{key.name}</td>
              <td>
                <div className={styles.keyRow}>
                  <span className={styles.keyValue}>
                    {key.key}••••••••••••••••
                  </span>
                  <span className={clsx(styles.envBadge, styles[`envBadge--${key.environment}`])}>
                    {key.environment}
                  </span>
                </div>
              </td>
              <td className={styles.keyMeta}>{key.createdAt}</td>
              <td className={styles.keyMeta}>{key.lastUsed}</td>
              <td>
                <div className={styles.actions}>
                  <ActionBtn
                    icon={copiedId === key.id ? <IconCheck /> : <IconCopy />}
                    onClick={() => handleCopy(key.id, key.key)}
                  />
                  <button
                    className={styles.revokeBtn}
                    onClick={() => revokeKey(key.id)}
                  >
                    Revoke
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Data Retention Tab
const DataRetentionTab: React.FC = () => {
  const [rawRetention, setRawRetention] = useState('7');
  const [aggregateRetention, setAggregateRetention] = useState('365');

  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Data Retention</h2>
          <p className={styles.sectionSubtitle}>Configure how long your data is stored</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.retentionList}>
          <div className={styles.retentionItem}>
            <div className={styles.retentionInfo}>
              <span className={styles.retentionLabel}>Raw Data Retention</span>
              <span className={styles.retentionDesc}>
                Individual measurement records from real users
              </span>
            </div>
            <select
              className={styles.retentionSelect}
              value={rawRetention}
              onChange={(e) => setRawRetention(e.target.value)}
            >
              {['7', '14', '30', '60', '90'].map((d) => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>

          <div className={styles.retentionItem}>
            <div className={styles.retentionInfo}>
              <span className={styles.retentionLabel}>Aggregate Data Retention</span>
              <span className={styles.retentionDesc}>
                Hourly P75 summaries used for trend charts
              </span>
            </div>
            <select
              className={styles.retentionSelect}
              value={aggregateRetention}
              onChange={(e) => setAggregateRetention(e.target.value)}
            >
              {['90', '180', '365', '730'].map((d) => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.retentionNote}>
          <span className={styles.retentionNoteIcon}>ℹ</span>
          <span>
            Longer retention periods will increase database storage usage.
            Raw data is automatically aggregated before deletion.
          </span>
        </div>
      </div>
    </div>
  );
};

// Account Tab
const AccountTab: React.FC = () => {
  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Account</h2>
          <p className={styles.sectionSubtitle}>Manage your account settings</p>
        </div>
      </div>

      {/* Profile */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Profile</h3>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Display Name</label>
            <input className={styles.formInput} defaultValue="John Doe" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input className={styles.formInput} defaultValue="john@example.com" type="email" />
          </div>
          <button className={styles.saveBtn}>Save Changes</button>
        </div>
      </div>

      {/* Password */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Change Password</h3>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current Password</label>
            <input className={styles.formInput} type="password" placeholder="••••••••" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>New Password</label>
            <input className={styles.formInput} type="password" placeholder="••••••••" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm Password</label>
            <input className={styles.formInput} type="password" placeholder="••••••••" />
          </div>
          <button className={styles.saveBtn}>Update Password</button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={clsx(styles.card, styles['card--danger'])}>
        <div className={styles.cardHeader}>
          <h3 className={clsx(styles.cardTitle, styles['cardTitle--danger'])}>
            Danger Zone
          </h3>
        </div>
        <div className={styles.dangerBody}>
          <div className={styles.dangerInfo}>
            <span className={styles.dangerLabel}>Delete Account</span>
            <span className={styles.dangerDesc}>
              Permanently delete your account and all associated data. This action cannot be undone.
            </span>
          </div>
          <button className={styles.deleteBtn}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Settings Page
// ============================================
const TABS: { id: SettingsTab; label: string }[] = [
  { id: 'sites', label: 'Sites' },
  { id: 'apiKeys', label: 'API Keys' },
  { id: 'dataRetention', label: 'Data Retention' },
  { id: 'account', label: 'Account' },
];

const Settings: React.FC = () => {
  const [activeNav, setActiveNav]       = useState('settings');
  const [selectedSite, setSelectedSite] = useState(SIDEBAR_SITES[0].name);
  const [activeTab, setActiveTab]       = useState<SettingsTab>('sites');

  const renderTab = () => {
    switch (activeTab) {
      case 'sites':         return <SitesTab />;
      case 'apiKeys':       return <ApiKeysTab />;
      case 'dataRetention': return <DataRetentionTab />;
      case 'account':       return <AccountTab />;
    }
  };

  return (
    <div className={styles.page}>
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        sites={SIDEBAR_SITES}
        navItems={defaultNavItems}
        selectedSite={selectedSite}
        onSiteChange={setSelectedSite}
      />

      <div className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Settings</h1>
        </header>

        <div className={styles.body}>
          {/* Left Tab Nav */}
          <nav className={styles.tabNav}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={clsx(styles.tabNavItem, {
                  [styles['tabNavItem--active']]: activeTab === tab.id,
                })}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Content */}
          <div className={styles.content}>
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

// API Keys 獨立 Tab
const ApiKeysTab: React.FC = () => (
  <div className={styles.tabContent}>
    <div className={styles.sectionHeader}>
      <div>
        <h2 className={styles.sectionTitle}>API Keys</h2>
        <p className={styles.sectionSubtitle}>Manage your API keys for SDK integration</p>
      </div>
    </div>
    <ApiKeysCard />
  </div>
);

export default Settings;