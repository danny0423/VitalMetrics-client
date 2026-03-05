import React, { useState } from "react";
import * as styles from "./Analytics.module.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar, { defaultNavItems } from "@/components/Sidebar/Sidebar";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import DeviceBreakdown from "./components/DeviceBreakdown/DeviceBreakdown";
import ConnectionType from "./components/ConnectionType/ConnectionType";
import BrowserBreakdown from "./components/BrowserBreakdown/BrowserBreakdown";
import GeographicTable from "./components/GeographicTable/GeographicTable";
import PerformanceHeatmap from "./components/PerformanceHeatmap/PerformanceHeatmap";
import {
  SITES,
  SUMMARY_CARDS,
  DEVICE_ROWS,
  CONNECTION_DATA,
  BROWSER_ROWS,
  GEO_ROWS,
} from "./data";

const Analytics: React.FC = () => {
  const [activeNav, setActiveNav] = useState("analytics");
  const [selectedSite, setSelectedSite] = useState(SITES[0].name);
  const [selectedRange, setSelectedRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState<"LCP" | "INP" | "CLS">("LCP");

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
          title="Analytics"
          breadcrumb={selectedSite}
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
          onExport={() => console.log("export")}
        />

        <div className={styles.body}>
          <SummaryCards cards={SUMMARY_CARDS} />

          <div className={styles.twoCol}>
            <DeviceBreakdown rows={DEVICE_ROWS} />
            <ConnectionType data={CONNECTION_DATA} />
          </div>

          <div className={styles.twoCol}>
            <BrowserBreakdown rows={BROWSER_ROWS} />
            <GeographicTable rows={GEO_ROWS} />
          </div>

          <PerformanceHeatmap
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
