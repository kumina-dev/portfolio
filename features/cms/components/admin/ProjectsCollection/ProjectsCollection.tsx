import Link from "next/link";
import type { CmsProjectBundle } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type ProjectsCollectionProps = {
  projects: CmsProjectBundle[];
};

export function ProjectsCollection({ projects }: ProjectsCollectionProps) {
  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Projects</p>
          <h1 className={shared.title}>Case studies</h1>
          <p className={shared.copy}>Featured work is promoted on the homepage. Draft items stay internal unless opened in preview mode.</p>
        </div>
        <Link className={shared.linkButton} href="/admin/projects/new">
          New project
        </Link>
      </div>

      <div className={shared.collectionGrid}>
        {projects.map(({ project, sections }) => (
          <article key={project.id} className={shared.collection}>
            <div className={shared.collectionRow}>
              <div>
                <span className={shared.statusBadge}>{project.status}</span>
                <h2>{project.title}</h2>
                <p className={shared.copy}>{project.headline}</p>
                <div className={shared.meta}>
                  <span>{project.stack.join(", ")}</span>
                  <span>{sections.length} sections</span>
                  <span>{project.featured ? "Featured" : "Standard"}</span>
                </div>
              </div>
              <div className={shared.inlineForm}>
                <a className={shared.linkButton} href={`/api/preview?path=/work/${project.slug}`}>
                  Preview
                </a>
                <Link className={shared.linkButton} href={`/admin/projects/${project.id}`}>
                  Edit
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
