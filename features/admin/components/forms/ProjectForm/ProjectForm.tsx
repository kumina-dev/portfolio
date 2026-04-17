import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/features/admin/actions/projects.actions";
import type { PortfolioProject } from "@/features/portfolio/types/portfolio";
import { Button } from "@/shared/components/Button/Button";
import styles from "./ProjectForm.module.css";

type ProjectFormProps =
  | {
      mode: "create";
      project?: never;
    }
  | {
      mode: "edit";
      project: PortfolioProject;
    };

export function ProjectForm(props: ProjectFormProps) {
  const project = props.mode === "edit" ? props.project : undefined;
  const action = props.mode === "create" ? createProjectAction : updateProjectAction;

  return (
    <form className={styles.form} action={action}>
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <label className={styles.field}>
        <span>Title</span>
        <input className={styles.input} name="title" defaultValue={project?.title ?? ""} required />
      </label>

      <label className={styles.field}>
        <span>Slug</span>
        <input className={styles.input} name="slug" defaultValue={project?.slug ?? ""} required />
      </label>

      <label className={styles.fieldFull}>
        <span>Description</span>
        <textarea
          className={styles.textarea}
          name="description"
          rows={5}
          defaultValue={project?.description ?? ""}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Repository URL</span>
        <input
          className={styles.input}
          name="repositoryUrl"
          defaultValue={project?.repositoryUrl ?? ""}
        />
      </label>

      <label className={styles.field}>
        <span>Live URL</span>
        <input
          className={styles.input}
          name="liveUrl"
          defaultValue={project?.liveUrl ?? ""}
        />
      </label>

      <label className={styles.field}>
        <span>Stack</span>
        <input
          className={styles.input}
          name="stack"
          defaultValue={project?.stack.join(", ") ?? ""}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Sort order</span>
        <input
          className={styles.input}
          name="sortOrder"
          type="number"
          defaultValue={project?.sortOrder ?? 0}
          required
        />
      </label>

      <label className={styles.checkbox}>
        <input
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured ?? false}
        />
        <span>Featured</span>
      </label>

      <div className={styles.actions}>
        {project ? (
          <Button
            className={styles.button}
            type="submit"
            formAction={deleteProjectAction}
            variant="secondary"
          >
            Delete project
          </Button>
        ) : null}
        <Button className={styles.button} type="submit">
          {props.mode === "create" ? "Create project" : "Save project"}
        </Button>
      </div>
    </form>
  );
}
