import {
  createExperienceAction,
  updateExperienceAction,
} from "@/features/admin/actions/experience.actions";
import type { PortfolioExperienceItem } from "@/features/portfolio/types/portfolio";
import styles from "./ExperienceForm.module.css";

type ExperienceFormProps =
  | {
      mode: "create";
      experience?: never;
    }
  | {
      mode: "edit";
      experience: PortfolioExperienceItem;
    };

export function ExperienceForm(props: ExperienceFormProps) {
  const experience = props.mode === "edit" ? props.experience : undefined;
  const action =
    props.mode === "create" ? createExperienceAction : updateExperienceAction;

  return (
    <form className={styles.form} action={action}>
      {experience ? <input type="hidden" name="id" value={experience.id} /> : null}

      <label className={styles.field}>
        <span>Role</span>
        <input
          className={styles.input}
          name="role"
          defaultValue={experience?.role ?? ""}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Company</span>
        <input
          className={styles.input}
          name="company"
          defaultValue={experience?.company ?? ""}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Period</span>
        <input
          className={styles.input}
          name="period"
          defaultValue={experience?.period ?? ""}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Sort order</span>
        <input
          className={styles.input}
          name="sortOrder"
          type="number"
          defaultValue={experience?.sortOrder ?? 0}
          required
        />
      </label>

      <label className={styles.fieldFull}>
        <span>Summary</span>
        <textarea
          className={styles.textarea}
          name="summary"
          rows={5}
          defaultValue={experience?.summary ?? ""}
          required
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          {props.mode === "create" ? "Create experience" : "Save experience"}
        </button>
      </div>
    </form>
  );
}