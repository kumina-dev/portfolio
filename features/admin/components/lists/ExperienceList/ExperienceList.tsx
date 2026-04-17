import Link from "next/link";
import type { PortfolioExperienceItem } from "@/features/portfolio/types/portfolio";
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
              <Link className={styles.editLink} href={`/admin/experience/${item.id}`}>
                Edit
              </Link>
            </div>
          </div>

          <p className={styles.summary}>{item.summary}</p>
        </article>
      ))}
    </div>
  );
}