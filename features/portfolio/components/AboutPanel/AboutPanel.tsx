import { Button } from "@/shared/components/Button/Button";
import { Section } from "@/shared/components/Section/Section";
import { Tag } from "@/shared/components/Tag/Tag";
import type { PortfolioProfile } from "../../types/portfolio";
import styles from "./AboutPanel.module.css";

type AboutPanelProps = {
  profile: PortfolioProfile;
};

export function AboutPanel({ profile }: AboutPanelProps) {
  return (
    <Section
      title="Building practical products that do not fight the user."
      description={profile.summary}
    >
      <div className={styles.panel}>
        <p className={styles.eyebrow}>About</p>

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
            <span className={styles.metaLabel}>Focus</span>
            <div>
              <Tag>{profile.title}</Tag>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button href={`mailto:${profile.email}`}>Email</Button>
          <Button href={profile.githubUrl} target="_blank" rel="noreferrer" variant="secondary">
            GitHub
          </Button>
        </div>
      </div>
    </Section>
  );
}
