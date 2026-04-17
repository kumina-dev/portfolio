import type { PortfolioExperienceItem } from "@/features/portfolio/types/portfolio";
import { Button } from "@/shared/components/Button/Button";
import styles from "./ExperienceList.module.css";

type ExperienceListProps = {
  experience: PortfolioExperienceItem[];
};

export function ExperienceList({ experience }: ExperienceListProps) {
  return (
    <div className={styles.list}>
      {experience.map((item) => (
        <article key={item.id} className={styles.card}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.role}>{item.role}</h2>
              <p className={styles.company}>{item.company}</p>
            </div>

            <div className={styles.actions}>
              <span className={styles.period}>{item.period}</span>
              <Button
                className={styles.editLink}
                href={`/admin/experience/${item.id}`}
                variant="secondary"
              >
                Edit
              </Button>
            </div>
          </div>

          <p className={styles.summary}>{item.summary}</p>
        </article>
      ))}
    </div>
  );
}
