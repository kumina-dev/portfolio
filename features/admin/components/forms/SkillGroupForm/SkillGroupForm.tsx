import {
  createSkillGroupAction,
  deleteSkillGroupAction,
  updateSkillGroupAction,
} from "@/features/admin/actions/skill-group.actions";
import type { SkillGroup } from "@/features/portfolio/types/portfolio";
import { Button } from "@/shared/components/Button/Button";
import styles from "./SkillGroupForm.module.css";

type SkillGroupFormProps =
  | {
      mode: "create";
      skillGroup?: never;
    }
  | {
      mode: "edit";
      skillGroup: SkillGroup;
    };

export function SkillGroupForm(props: SkillGroupFormProps) {
  const skillGroup = props.mode === "edit" ? props.skillGroup : undefined;
  const action = props.mode === "create" ? createSkillGroupAction : updateSkillGroupAction;

  return (
    <form className={styles.form} action={action}>
      {skillGroup ? <input type="hidden" name="id" value={skillGroup.id} /> : null}

      <label className={styles.field}>
        <span>Title</span>
        <input
          className={styles.input}
          name="title"
          defaultValue={skillGroup?.title ?? ""}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Sort order</span>
        <input
          className={styles.input}
          name="sortOrder"
          type="number"
          defaultValue={skillGroup?.sortOrder ?? 0}
          required
        />
      </label>

      <label className={styles.fieldFull}>
        <span>Items</span>
        <textarea
          className={styles.textarea}
          name="items"
          rows={4}
          defaultValue={skillGroup?.items.join(", ") ?? ""}
          required
        />
      </label>

      <div className={styles.actions}>
        {skillGroup ? (
          <Button
            className={styles.button}
            type="submit"
            formAction={deleteSkillGroupAction}
            variant="secondary"
          >
            Delete skill group
          </Button>
        ) : null}
        <Button className={styles.button} type="submit">
          {props.mode === "create" ? "Create skill group" : "Save skill group"}
        </Button>
      </div>
    </form>
  );
}
