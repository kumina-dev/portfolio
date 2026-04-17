import Link from "next/link";
import type { SkillGroup } from "@/features/portfolio/types/portfolio";
import styles from "./SkillGroupsList.module.css";

type SkillGroupsListProps = {
  skillGroups: SkillGroup[];
};

export function SkillGroupsList({ skillGroups }: SkillGroupsListProps) {
  return (
    <div className={styles.list}>
      {skillGroups.map((group) => (
        <article key={group.id} className={styles.card}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{group.title}</h2>
              <span className={styles.sortOrder}>#{group.sortOrder}</span>
            </div>

            <Link className={styles.editLink} href={`/admin/skills/${group.id}`}>
              Edit
            </Link>
          </div>

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
  );
}