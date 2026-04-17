import type { PortfolioProfile } from "../../types/portfolio";
import styles from "./AboutPanel.module.css";

type AboutPanelProps = {
  profile: PortfolioProfile;
};

export function AboutPanel({ profile }: AboutPanelProps) {
  return (
    <section className={styles.panel}>
      <p className={styles.eyebrow}>About</p>
      <h2 className={styles.title}>Building practical products that do not fight the user.</h2>
      <p className={styles.summary}>{profile.summary}</p>

      <div className={styles.metaGrid}>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Name</span>
          <strong>{profile.name}</strong>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Role</span>
          <strong>{profile.title}</strong>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Location</span>
          <strong>{profile.location ?? "Not set"}</strong>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>GitHub</span>
          <strong>kumina-dev</strong>
        </div>
      </div>
    </section>
  );
}