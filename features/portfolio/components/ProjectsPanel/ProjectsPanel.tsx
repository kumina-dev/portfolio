import type { PortfolioProject } from "../../types/portfolio";
import styles from "./ProjectsPanel.module.css";

type ProjectsPanelProps = {
  projects: PortfolioProject[];
};

export function ProjectsPanel({ projects }: ProjectsPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Projects</p>
        <h2 className={styles.title}>Selected work</h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              {project.featured ? <span className={styles.badge}>Featured</span> : null}
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.tags}>
              {project.stack.map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>

            <div className={styles.links}>
              {project.repositoryUrl ? (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  Repository
                </a>
              ) : null}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}