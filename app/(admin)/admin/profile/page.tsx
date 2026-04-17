import { ProfileForm } from "@/features/admin/components/forms/ProfileForm/ProfileForm";
import { adminProfileService } from "@/features/admin/server/admin-profile.service";
import styles from "./page.module.css";

export default async function AdminProfilePage() {
  const profile = await adminProfileService.getProfile();
  
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.description}>Edit public identity and summary fields.</p>
      </div>
      <ProfileForm profile={profile} />
    </section>
  );
}