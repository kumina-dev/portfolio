import { PORTFOLIO_SECTIONS } from "../../lib/portfolio.contants";
import type {
  PortfolioContact,
  PortfolioProfile,
  PortfolioSectionKey,
} from "../../types/portfolio";
import styles from "./PortfolioSidebar.module.css";

type PortfolioSidebarProps = {
  profile: PortfolioProfile;
  contact: PortfolioContact;
  activeSection: PortfolioSectionKey;
  onSectionChange: (section: PortfolioSectionKey) => void;
};

export function PortfolioSidebar({
  profile,
  contact,
  activeSection,
  onSectionChange,
}: PortfolioSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileBlock}>
        <p className={styles.eyebrow}>Portfolio</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.title}>{profile.title}</p>
        {profile.location ? <p className={styles.location}>{profile.location}</p> : null}
      </div>

      <nav className={styles.nav} aria-label="Portfolio sections">
        {PORTFOLIO_SECTIONS.map((section) => (
          <button
            key={section.key}
            type="button"
            className={section.key === activeSection ? styles.navItemActive : styles.navItem}
            onClick={() => onSectionChange(section.key)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className={styles.contactBlock}>
        <a className={styles.link} href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <a className={styles.link} href={contact.githubUrl} target="_blank" rel="noreferrer">
          github.com/kumina-dev
        </a>
      </div>
    </aside>
  );
}