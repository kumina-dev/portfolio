import type { PortfolioSectionKey } from "../types/portfolio";

export const PORTFOLIO_SECTIONS: Array<{
  key: PortfolioSectionKey;
  label: string;
}> = [
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "contact", label: "Contact" },
];

export const DEFAULT_PORTFOLIO_SECTION: PortfolioSectionKey = "about";

export const PORTFOLIO_CACHE_TAG = "portfolio";
export const PORTFOLIO_REVALIDATE_SECONDS = 300;