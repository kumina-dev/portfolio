import { Section } from "@/shared/components/Section/Section";
import { Tag } from "@/shared/components/Tag/Tag";
import type { SkillGroup } from "../../types/portfolio";
import styles from "./SkillsPanel.module.css";

type SkillsPanelProps = {
  skillGroups: SkillGroup[];
};

export function SkillsPanel({ skillGroups }: SkillsPanelProps) {
  return (
    <Section title="Core stack" description="Tools, platforms, and working patterns I keep coming back to.">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Skills</p>

        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <article key={group.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{group.title}</h3>

              <div className={styles.tags}>
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
