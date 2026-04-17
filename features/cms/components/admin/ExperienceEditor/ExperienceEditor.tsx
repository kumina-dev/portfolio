import {
  createExperienceAction,
  deleteExperienceAction,
  updateExperienceAction,
} from "@/features/cms/actions/experience.actions";
import type { CmsExperienceRecord } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type ExperienceEditorProps = {
  experience: CmsExperienceRecord | null;
};

export function ExperienceEditor({ experience }: ExperienceEditorProps) {
  const action = experience ? updateExperienceAction : createExperienceAction;

  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Experience editor</p>
          <h1 className={shared.title}>{experience ? experience.role : "New experience entry"}</h1>
          <p className={shared.copy}>Enter one highlight per line to keep the public timeline readable.</p>
        </div>
        {experience ? <span className={shared.statusBadge}>{experience.status}</span> : null}
      </div>

      <div className={shared.editorCard}>
        <form className={shared.form} action={action}>
          {experience ? <input type="hidden" name="id" value={experience.id} /> : null}
          <div className={shared.grid}>
            <label className={shared.field}>
              <span>Role</span>
              <input className={shared.input} name="role" defaultValue={experience?.role ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Company</span>
              <input className={shared.input} name="company" defaultValue={experience?.company ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Period</span>
              <input className={shared.input} name="period" defaultValue={experience?.period ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Sort order</span>
              <input className={shared.input} name="sortOrder" type="number" defaultValue={experience?.sort_order ?? 0} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Summary</span>
              <textarea className={shared.textarea} name="summary" defaultValue={experience?.summary ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Highlights</span>
              <textarea className={shared.textarea} name="highlights" defaultValue={experience?.highlights.join("\n") ?? ""} required />
            </label>
          </div>
          <div className={shared.actions}>
            <button className={shared.secondaryButton} type="submit" name="intent" value="draft">
              Save draft
            </button>
            <button className={shared.actionButton} type="submit" name="intent" value="publish">
              Publish
            </button>
            {experience ? (
              <button className={shared.dangerButton} type="submit" formAction={deleteExperienceAction}>
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
