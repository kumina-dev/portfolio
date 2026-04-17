import { Button } from "@/shared/components/Button/Button";
import { Section } from "@/shared/components/Section/Section";
import { Tag } from "@/shared/components/Tag/Tag";
import type { PortfolioProject } from "../../types/portfolio";
import styles from "./ProjectsPanel.module.css";

type ProjectsPanelProps = {
  projects: PortfolioProject[];
};

export function ProjectsPanel({ projects }: ProjectsPanelProps) {
  return (
    <Section title="Selected work" description="Recent projects, product bets, and technical direction.">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Projects</p>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                {project.featured ? <Tag>Featured</Tag> : null}
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.tags}>
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>

              <div className={styles.links}>
                {project.repositoryUrl ? (
                  <Button
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    Repository
                  </Button>
                ) : null}
                {project.liveUrl ? (
                  <Button href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
