import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/features/cms/actions/projects.actions";
import type { CmsProjectBundle } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type ProjectEditorProps = {
  projectBundle: CmsProjectBundle | null;
};

function getSectionValue(projectBundle: CmsProjectBundle | null, key: "overview" | "impact" | "technical", field: "heading" | "content") {
  return projectBundle?.sections.find((section) => section.section_key === key)?.[field] ?? "";
}

export function ProjectEditor({ projectBundle }: ProjectEditorProps) {
  const project = projectBundle?.project;
  const action = project ? updateProjectAction : createProjectAction;

  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Project editor</p>
          <h1 className={shared.title}>{project ? project.title : "New case study"}</h1>
          <p className={shared.copy}>Shape the homepage card and the deeper case-study narrative in one place.</p>
        </div>
        <div className={shared.inlineForm}>
          {project ? <span className={shared.statusBadge}>{project.status}</span> : null}
          {project ? (
            <a className={shared.linkButton} href={`/api/preview?path=/work/${project.slug}`}>
              Preview
            </a>
          ) : null}
        </div>
      </div>

      <div className={shared.editorCard}>
        <form className={shared.form} action={action}>
          {project ? <input type="hidden" name="id" value={project.id} /> : null}

          <div className={shared.grid}>
            <label className={shared.field}>
              <span>Title</span>
              <input className={shared.input} name="title" defaultValue={project?.title ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Slug</span>
              <input className={shared.input} name="slug" defaultValue={project?.slug ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Headline</span>
              <textarea className={shared.textarea} name="headline" defaultValue={project?.headline ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Summary</span>
              <textarea className={shared.textarea} name="summary" defaultValue={project?.summary ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Role</span>
              <input className={shared.input} name="role" defaultValue={project?.role ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Sort order</span>
              <input className={shared.input} name="sortOrder" type="number" defaultValue={project?.sort_order ?? 0} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Outcomes</span>
              <textarea className={shared.textarea} name="outcomes" defaultValue={project?.outcomes ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Repository URL</span>
              <input className={shared.input} name="repositoryUrl" defaultValue={project?.repository_url ?? ""} />
            </label>
            <label className={shared.field}>
              <span>Live URL</span>
              <input className={shared.input} name="liveUrl" defaultValue={project?.live_url ?? ""} />
            </label>
            <label className={shared.field}>
              <span>Cover image URL</span>
              <input className={shared.input} name="coverImageUrl" defaultValue={project?.cover_image_url ?? ""} />
            </label>
            <label className={shared.field}>
              <span>Stack</span>
              <textarea className={shared.textarea} name="stack" defaultValue={project?.stack.join("\n") ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>
                <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} /> Featured on home
              </span>
            </label>
            <label className={shared.field}>
              <span>Overview heading</span>
              <input className={shared.input} name="overviewHeading" defaultValue={getSectionValue(projectBundle, "overview", "heading")} required />
            </label>
            <label className={shared.field}>
              <span>Impact heading</span>
              <input className={shared.input} name="impactHeading" defaultValue={getSectionValue(projectBundle, "impact", "heading")} required />
            </label>
            <label className={shared.field}>
              <span>Technical heading</span>
              <input className={shared.input} name="technicalHeading" defaultValue={getSectionValue(projectBundle, "technical", "heading")} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Overview content</span>
              <textarea className={shared.textarea} name="overviewContent" defaultValue={getSectionValue(projectBundle, "overview", "content")} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Impact content</span>
              <textarea className={shared.textarea} name="impactContent" defaultValue={getSectionValue(projectBundle, "impact", "content")} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Technical content</span>
              <textarea className={shared.textarea} name="technicalContent" defaultValue={getSectionValue(projectBundle, "technical", "content")} required />
            </label>
          </div>

          <div className={shared.actions}>
            <button className={shared.secondaryButton} type="submit" name="intent" value="draft">
              Save draft
            </button>
            <button className={shared.actionButton} type="submit" name="intent" value="publish">
              Publish
            </button>
            {project ? (
              <button className={shared.dangerButton} type="submit" formAction={deleteProjectAction}>
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
