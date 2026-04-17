import { updateProfileAction } from "@/features/admin/actions/profile.actions";
import type { PortfolioProfile } from "@/features/portfolio/types/portfolio";
import { Button } from "@/shared/components/Button/Button";
import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  profile: PortfolioProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  return (
    <form className={styles.form} action={updateProfileAction}>
      <label className={styles.field}>
        <span>Name</span>
        <input className={styles.input} name="name" defaultValue={profile.name} required />
      </label>

      <label className={styles.field}>
        <span>Title</span>
        <input className={styles.input} name="title" defaultValue={profile.title} required />
      </label>

      <label className={styles.field}>
        <span>Location</span>
        <input
          className={styles.input}
          name="location"
          defaultValue={profile.location ?? ""}
        />
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input className={styles.input} name="email" defaultValue={profile.email} required />
      </label>

      <label className={styles.field}>
        <span>GitHub URL</span>
        <input
          className={styles.input}
          name="githubUrl"
          defaultValue={profile.githubUrl}
          required
        />
      </label>

      <label className={styles.fieldFull}>
        <span>Summary</span>
        <textarea
          className={styles.textarea}
          name="summary"
          rows={6}
          defaultValue={profile.summary}
          required
        />
      </label>

      <div className={styles.actions}>
        <Button className={styles.button} type="submit">
          Save profile
        </Button>
      </div>
    </form>
  );
}
