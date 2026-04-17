import type { PortfolioExperienceItem } from "../../types/portfolio";
import styles from "./ExperiencePanel.module.css";

type ExperiencePanelProps = {
  experience: PortfolioExperienceItem[];
};

export function ExperiencePanel({ experience }: ExperiencePanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Experience</p>
        <h2 className={styles.title}>Timeline</h2>
      </div>

      <div className={styles.list}>
        {experience.map((item) => (
          <article key={item.id} className={styles.item}>
            <div className={styles.meta}>
              <h3 className={styles.role}>{item.role}</h3>
              <p className={styles.company}>{item.company}</p>
            </div>

            <div className={styles.details}>
              <span className={styles.period}>{item.period}</span>
              <p className={styles.summary}>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}