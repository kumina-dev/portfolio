import type { PortfolioProfile } from "@/features/portfolio/types/portfolio";
import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  profile: PortfolioProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  return (
    <form className={styles.form}>
      <label className={styles.field}>
        <span>Name</span>
        <input className={styles.input} name="name" defaultValue={profile.name} />
      </label>

      <label className={styles.field}>
        <span>Title</span>
        <input className={styles.input} name="title" defaultValue={profile.title} />
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
        <input className={styles.input} name="email" defaultValue={profile.email} />
      </label>

      <label className={styles.field}>
        <span>GitHub URL</span>
        <input
          className={styles.input}
          name="githubUrl"
          defaultValue={profile.githubUrl}
        />
      </label>

      <label className={styles.fieldFull}>
        <span>Summary</span>
        <textarea
          className={styles.textarea}
          name="summary"
          rows={6}
          defaultValue={profile.summary}
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          Save profile
        </button>
      </div>
    </form>
  );
}