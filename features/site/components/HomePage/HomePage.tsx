import Link from "next/link";
import type { HomePageViewModel } from "../../types/site";
import styles from "./HomePage.module.css";

type HomePageProps = {
  data: HomePageViewModel;
};

export function HomePage({ data }: HomePageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        {data.preview ? <p className={styles.previewBadge}>Preview mode</p> : null}
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{data.profile.featuredLabel}</p>
          <h1 className={styles.title}>{data.profile.title}</h1>
          <p className={styles.intro}>{data.profile.heroIntro}</p>
          <p className={styles.summary}>{data.profile.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={`mailto:${data.profile.email}`}>
              Contact
            </a>
            <a
              className={styles.secondaryAction}
              href={data.profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className={styles.heroMeta}>
          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Name</span>
            <strong>{data.profile.name}</strong>
          </div>
          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Location</span>
            <strong>{data.profile.location ?? "Remote friendly"}</strong>
          </div>
          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Focus</span>
            <strong>{data.profile.availability}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>Selected work</p>
          <h2 className={styles.sectionTitle}>Proof of execution, not a vague skills cloud.</h2>
        </div>
        <div className={styles.projectGrid}>
          {data.featuredProjects.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <p className={styles.projectRole}>{project.role}</p>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectHeadline}>{project.headline}</p>
              <p className={styles.projectSummary}>{project.summary}</p>
              <div className={styles.tagRow}>
                {project.stack.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
              <Link className={styles.projectLink} href={`/work/${project.slug}`}>
                Read case study
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.twoColumnSection}>
        <div className={styles.column}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Experience</p>
            <h2 className={styles.sectionTitle}>Practical product work across the stack.</h2>
          </div>
          <div className={styles.timeline}>
            {data.experience.map((item) => (
              <article key={item.id} className={styles.timelineItem}>
                <div className={styles.timelineTop}>
                  <h3>{item.role}</h3>
                  <span>{item.period}</span>
                </div>
                <p className={styles.company}>{item.company}</p>
                <p>{item.summary}</p>
                <ul className={styles.highlightList}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Capabilities</p>
            <h2 className={styles.sectionTitle}>Structured around outcomes and systems.</h2>
          </div>
          <div className={styles.skillGroups}>
            {data.skillGroups.map((group) => (
              <article key={group.id} className={styles.skillCard}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className={styles.skillList}>
                  {group.items.map((item) => (
                    <li key={item.id} className={styles.skillItem}>
                      <span>{item.label}</span>
                      {item.emphasis ? <strong>{item.emphasis}</strong> : null}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div>
          <p className={styles.sectionEyebrow}>Next move</p>
          <h2 className={styles.sectionTitle}>If you need someone who can shape and ship the work, let’s talk.</h2>
        </div>
        <div className={styles.contactActions}>
          <a className={styles.primaryAction} href={`mailto:${data.profile.email}`}>
            {data.profile.email}
          </a>
          <Link className={styles.secondaryAction} href="/admin">
            CMS
          </Link>
        </div>
      </section>
    </main>
  );
}
