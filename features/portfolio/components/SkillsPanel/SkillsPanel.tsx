import type { SkillGroup } from "../../types/portfolio";
import styles from "./SkillsPanel.module.css";

type SkillsPanelProps = {
  skillGroups: SkillGroup[];
};

export function SkillsPanel({ skillGroups }: SkillsPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Skills</p>
        <h2 className={styles.title}>Core stack</h2>
      </div>

      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <article key={group.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{group.title}</h3>

            <div className={styles.tags}>
              {group.items.map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}