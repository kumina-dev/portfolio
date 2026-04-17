import Link from "next/link";
import { ExperienceList } from "@/features/admin/components/lists/ExperienceList/ExperienceList";
import { adminExperienceService } from "@/features/admin/server/admin-experience.service";
import styles from "./page.module.css";

export default async function AdminExperiencePage() {
  const experience = await adminExperienceService.listExperience();

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Experience</h1>
          <p className={styles.description}>Manage timeline items and summaries.</p>
        </div>

        <Link className={styles.createLink} href="/admin/experience/new">
          New experience
        </Link>
      </div>

      <ExperienceList experience={experience} />
    </section>
  );
}