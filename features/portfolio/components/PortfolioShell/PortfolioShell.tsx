"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PORTFOLIO_SECTION, PORTFOLIO_SECTIONS } from "../../lib/portfolio.contants";
import type { PortfolioPageData, PortfolioSectionKey } from "../../types/portfolio";
import { PortfolioSidebar } from "../PortfolioSidebar/PortfolioSidebar";
import { PortfolioContent } from "../PortfolioContent/PortfolioContent";
import styles from "./PortfolioShell.module.css";

type PortfolioShellProps = {
  data: PortfolioPageData;
};

function isPortfolioSectionKey(value: string): value is PortfolioSectionKey {
  return PORTFOLIO_SECTIONS.some((section) => section.key === value);
}

export function PortfolioShell({ data }: PortfolioShellProps) {
  const [activeSection, setActiveSection] = useState<PortfolioSectionKey>(DEFAULT_PORTFOLIO_SECTION);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (isPortfolioSectionKey(hash)) {
        setActiveSection(hash);
        return;
      }

      setActiveSection(DEFAULT_PORTFOLIO_SECTION);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const activeSectionLabel = useMemo(() => {
    return (
      PORTFOLIO_SECTIONS.find((section) => section.key === activeSection)?.label ??
      "Portfolio"
    );
  }, [activeSection]);

  const handleSectionChange = (section: PortfolioSectionKey) => {
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);
  };

  return (
    <section className={styles.window}>
      <div className={styles.topbar}>
        <div className={styles.windowControls} aria-hidden="true">
          <span className={styles.control} />
          <span className={styles.control} />
          <span className={styles.control} />
        </div>
        <div className={styles.topbarTitle}>{activeSectionLabel}</div>
      </div>

      <div className={styles.body}>
        <PortfolioSidebar
          profile={data.profile}
          contact={data.contact}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <PortfolioContent data={data} activeSection={activeSection} />
      </div>
    </section>
  );
}