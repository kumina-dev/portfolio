import Link from "next/link";
import type { CmsDashboardSummary } from "@/features/cms/types/cms";
import styles from "./CmsDashboard.module.css";

type CmsDashboardProps = {
  summary: CmsDashboardSummary;
};

export function CmsDashboard({ summary }: CmsDashboardProps) {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Content health</p>
          <h1 className={styles.title}>Editorial overview</h1>
          <p className={styles.copy}>
            Last updated {summary.lastUpdatedLabel}. Missing collections:{" "}
            {summary.missingCollections.length > 0 ? summary.missingCollections.join(", ") : "none"}.
          </p>
        </div>
        <a className={styles.previewLink} href="/api/preview?path=/">
          Preview home
        </a>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <p className={styles.label}>Profile</p>
          <strong>{summary.profileStatus}</strong>
          <Link href="/admin/profile">Edit profile</Link>
        </article>
        <article className={styles.card}>
          <p className={styles.label}>Projects</p>
          <strong>
            {summary.publishedProjectCount}/{summary.projectCount} published
          </strong>
          <Link href="/admin/projects">Open collection</Link>
        </article>
        <article className={styles.card}>
          <p className={styles.label}>Skills</p>
          <strong>
            {summary.publishedSkillGroupCount}/{summary.skillGroupCount} published
          </strong>
          <Link href="/admin/skills">Open collection</Link>
        </article>
        <article className={styles.card}>
          <p className={styles.label}>Experience</p>
          <strong>
            {summary.publishedExperienceCount}/{summary.experienceCount} published
          </strong>
          <Link href="/admin/experience">Open collection</Link>
        </article>
      </div>
    </section>
  );
}
