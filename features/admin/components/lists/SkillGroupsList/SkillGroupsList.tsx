import type { SkillGroup } from "@/features/portfolio/types/portfolio";
import { Button } from "@/shared/components/Button/Button";
import { Tag } from "@/shared/components/Tag/Tag";
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

            <Button className={styles.editLink} href={`/admin/skills/${group.id}`} variant="secondary">
              Edit
            </Button>
          </div>

          <div className={styles.tags}>
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
