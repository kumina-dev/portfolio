import { updateSkillGroupAction } from "@/features/admin/actions/skill-group.actions";
import type { SkillGroup } from "@/features/portfolio/types/portfolio";
import styles from "./SkillGroupForm.module.css";

type SkillGroupFormProps = {
  skillGroup: SkillGroup;
};

export function SkillGroupForm({ skillGroup }: SkillGroupFormProps) {
  return (
    <form className={styles.form} action={updateSkillGroupAction}>
      <input type="hidden" name="id" value={skillGroup.id} />

      <label className={styles.field}>
        <span>Title</span>
        <input
          className={styles.input}
          name="title"
          defaultValue={skillGroup.title}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Sort order</span>
        <input
          className={styles.input}
          name="sortOrder"
          type="number"
          defaultValue={skillGroup.sortOrder}
          required
        />
      </label>

      <label className={styles.fieldFull}>
        <span>Items</span>
        <textarea
          className={styles.textarea}
          name="items"
          rows={4}
          defaultValue={skillGroup.items.join(", ")}
          required
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          Save skill group
        </button>
      </div>
    </form>
  );
}