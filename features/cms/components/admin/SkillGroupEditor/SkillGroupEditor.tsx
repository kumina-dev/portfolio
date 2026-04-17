import {
  createSkillGroupAction,
  deleteSkillGroupAction,
  updateSkillGroupAction,
} from "@/features/cms/actions/skill-groups.actions";
import type { CmsSkillGroupBundle } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type SkillGroupEditorProps = {
  skillGroupBundle: CmsSkillGroupBundle | null;
};

export function SkillGroupEditor({ skillGroupBundle }: SkillGroupEditorProps) {
  const group = skillGroupBundle?.group;
  const items = skillGroupBundle?.items ?? [];
  const action = group ? updateSkillGroupAction : createSkillGroupAction;

  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Skill group editor</p>
          <h1 className={shared.title}>{group ? group.title : "New skill group"}</h1>
          <p className={shared.copy}>Enter one item per line using the format `Label | Emphasis`.</p>
        </div>
        {group ? <span className={shared.statusBadge}>{group.status}</span> : null}
      </div>

      <div className={shared.editorCard}>
        <form className={shared.form} action={action}>
          {group ? <input type="hidden" name="id" value={group.id} /> : null}
          <div className={shared.grid}>
            <label className={shared.field}>
              <span>Title</span>
              <input className={shared.input} name="title" defaultValue={group?.title ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Sort order</span>
              <input className={shared.input} name="sortOrder" type="number" defaultValue={group?.sort_order ?? 0} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Description</span>
              <textarea className={shared.textarea} name="description" defaultValue={group?.description ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Items</span>
              <textarea
                className={shared.textarea}
                name="items"
                defaultValue={items.map((item) => `${item.label}${item.emphasis ? ` | ${item.emphasis}` : ""}`).join("\n")}
                required
              />
            </label>
          </div>
          <div className={shared.actions}>
            <button className={shared.secondaryButton} type="submit" name="intent" value="draft">
              Save draft
            </button>
            <button className={shared.actionButton} type="submit" name="intent" value="publish">
              Publish
            </button>
            {group ? (
              <button className={shared.dangerButton} type="submit" formAction={deleteSkillGroupAction}>
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
