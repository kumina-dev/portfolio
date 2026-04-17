import Link from "next/link";
import type { ProjectDetailViewModel } from "../../types/site";
import styles from "./ProjectDetailPage.module.css";

type ProjectDetailPageProps = {
  project: ProjectDetailViewModel;
  preview: boolean;
};

export function ProjectDetailPage({ project, preview }: ProjectDetailPageProps) {
  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/">
        Home
      </Link>

      <section className={styles.hero}>
        {preview ? <p className={styles.previewBadge}>Preview mode</p> : null}
        <p className={styles.eyebrow}>{project.role}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.headline}>{project.headline}</p>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.tagRow}>
          {project.stack.map((item) => (
            <span key={item} className={styles.tag}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          {project.liveUrl ? (
            <a className={styles.primaryAction} href={project.liveUrl} target="_blank" rel="noreferrer">
              Live project
            </a>
          ) : null}
          {project.repositoryUrl ? (
            <a className={styles.secondaryAction} href={project.repositoryUrl} target="_blank" rel="noreferrer">
              Repository
            </a>
          ) : null}
        </div>
      </section>

      <section className={styles.contentGrid}>
        <article className={styles.outcomesCard}>
          <p className={styles.eyebrow}>Outcome</p>
          <h2>Why this work matters</h2>
          <p>{project.outcomes}</p>
        </article>

        <div className={styles.sectionStack}>
          {project.sections.map((section) => (
            <article key={section.key} className={styles.sectionCard}>
              <p className={styles.eyebrow}>{section.key}</p>
              <h2>{section.heading}</h2>
              <p>{section.content}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
