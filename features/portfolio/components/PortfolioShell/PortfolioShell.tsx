"use client";

import { useMemo, useState } from "react";
import { DEFAULT_PORTFOLIO_SECTION, PORTFOLIO_SECTIONS } from "../../lib/portfolio.contants";
import type { PortfolioPageData, PortfolioSectionKey } from "../../types/portfolio";
import { PortfolioSidebar } from "../PortfolioSidebar/PortfolioSidebar";
import { PortfolioContent } from "../PortfolioContent/PortfolioContent";
import styles from "./PortfolioShell.module.css";

type PortfolioShellProps = {
  data: PortfolioPageData;
};

function getInitialSection(): PortfolioSectionKey {
  if (typeof window === "undefined") {
    return DEFAULT_PORTFOLIO_SECTION;
  }

  const hash = window.location.hash.replace("#", "") as PortfolioSectionKey;
  const isValid = PORTFOLIO_SECTIONS.some((section) => section.key === hash);

  return isValid ? hash : DEFAULT_PORTFOLIO_SECTION;
}

export function PortfolioShell({ data }: PortfolioShellProps) {
  const [activeSection, setActiveSection] = useState<PortfolioSectionKey>(getInitialSection);

  const activeSectionLabel = useMemo(() => {
    return (
      PORTFOLIO_SECTIONS.find((section) => section.key === activeSection)?.label ??
      "Portfolio"
    );
  }, [activeSection]);

  const handleSectionChange = (section: PortfolioSectionKey) => {
    setActiveSection(section);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${section}`);
    }
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