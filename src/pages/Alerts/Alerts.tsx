import React, { useState } from "react";
import * as styles from "./Alerts.module.scss";
import Sidebar, { defaultNavItems } from "../../components/Sidebar/Sidebar";
import PageHeader from "../../components/PageHeader/PageHeader";
import AlertSummary from "./components/AlertSummary/AlertSummary";
import AlertRules from "./components/AlertRules/AlertRules";
import TriggerHistory from "./components/TriggerHistory/TriggerHistory";
import NewAlertPanel from "./components/NewAlertPanel/NewAlertPanel";
import {
  SITES,
  ALERT_RULES,
  TRIGGER_HISTORY,
  DEFAULT_FORM,
  METRIC_UNITS,
  AlertRule,
  NewAlertForm,
} from "./data";

const Alerts: React.FC = () => {
  const [activeNav, setActiveNav] = useState("alerts");
  const [selectedSite, setSelectedSite] = useState(SITES[0].name);
  const [selectedRange, setSelectedRange] = useState("7d");
  const [rules, setRules] = useState<AlertRule[]>(ALERT_RULES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewAlertForm>(DEFAULT_FORM);

  const activeCount = rules.filter((r) => r.isActive).length;
  const triggeredToday = TRIGGER_HISTORY.filter(
    (h) => h.time.includes("hrs") || h.time === "just now",
  ).length;

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
    );
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleFormChange = (field: keyof NewAlertForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.threshold) return;
    const newRule: AlertRule = {
      id: String(Date.now()),
      name: form.name,
      site: form.site,
      metric: form.metric,
      threshold: `> ${form.threshold}${METRIC_UNITS[form.metric]}`,
      notifyVia: form.notifyVia,
      isActive: true,
    };
    setRules((prev) => [newRule, ...prev]);
    setShowModal(false);
    setForm(DEFAULT_FORM);
  };

  return (
    <div className={styles.page}>
      <Sidebar
        navItems={defaultNavItems}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        sites={SITES}
        selectedSite={selectedSite}
        onSiteChange={setSelectedSite}
      />

      <div className={styles.main}>
        <PageHeader
          title="Alerts"
          breadcrumb={selectedSite}
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
        />

        <div className={styles.body}>
          <div className={styles.layout}>
            <div className={styles.leftCol}>
              <AlertSummary activeCount={activeCount} triggeredToday={triggeredToday} />
              <AlertRules
                rules={rules}
                onToggle={toggleRule}
                onDelete={deleteRule}
                onNewAlert={() => setShowModal(true)}
              />
              <TriggerHistory history={TRIGGER_HISTORY} />
            </div>

            {showModal && (
              <NewAlertPanel
                form={form}
                onFormChange={handleFormChange}
                onSave={handleSave}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
