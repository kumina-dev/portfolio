import { saveProfileAction } from "@/features/cms/actions/profile.actions";
import type { CmsProfileRecord } from "@/features/cms/types/cms";
import shared from "../admin-shared.module.css";

type ProfileEditorProps = {
  profile: CmsProfileRecord | null;
};

export function ProfileEditor({ profile }: ProfileEditorProps) {
  return (
    <section className={shared.page}>
      <div className={shared.header}>
        <div>
          <p className={shared.eyebrow}>Profile</p>
          <h1 className={shared.title}>Homepage identity</h1>
          <p className={shared.copy}>This controls the hero, contact, and recruiter-facing positioning on the public site.</p>
        </div>
        <div className={shared.inlineForm}>
          <span className={shared.statusBadge}>{profile?.status ?? "draft"}</span>
          <a className={shared.linkButton} href="/api/preview?path=/">
            Preview home
          </a>
        </div>
      </div>

      <div className={shared.editorCard}>
        <form className={shared.form} action={saveProfileAction}>
          <div className={shared.grid}>
            <label className={shared.field}>
              <span>Name</span>
              <input className={shared.input} name="name" defaultValue={profile?.name ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Title</span>
              <input className={shared.input} name="title" defaultValue={profile?.title ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Location</span>
              <input className={shared.input} name="location" defaultValue={profile?.location ?? ""} />
            </label>
            <label className={shared.field}>
              <span>Featured label</span>
              <input className={shared.input} name="featuredLabel" defaultValue={profile?.featured_label ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>Email</span>
              <input className={shared.input} name="email" defaultValue={profile?.email ?? ""} required />
            </label>
            <label className={shared.field}>
              <span>GitHub URL</span>
              <input className={shared.input} name="githubUrl" defaultValue={profile?.github_url ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Hero intro</span>
              <textarea className={shared.textarea} name="heroIntro" defaultValue={profile?.hero_intro ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Summary</span>
              <textarea className={shared.textarea} name="summary" defaultValue={profile?.summary ?? ""} required />
            </label>
            <label className={shared.fieldFull}>
              <span>Availability</span>
              <textarea className={shared.textarea} name="availability" defaultValue={profile?.availability ?? ""} required />
            </label>
          </div>
          <div className={shared.actions}>
            <button className={shared.secondaryButton} type="submit" name="intent" value="draft">
              Save draft
            </button>
            <button className={shared.actionButton} type="submit" name="intent" value="publish">
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
