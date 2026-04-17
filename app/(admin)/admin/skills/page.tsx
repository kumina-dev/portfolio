import { adminSkillsService } from "@/features/admin/server/admin-skills.service";
import styles from "./page.module.css";
import { SkillGroupsList } from "@/features/admin/components/lists/SkillGroupsList/SkillGroupsList";

export default async function AdminSkillsPage() {
  const skillGroups = await adminSkillsService.listSkillGroups();

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Skills</h1>
        <p className={styles.description}>Edit grouped skills shown on the portfolio.</p>
      </div>
      <SkillGroupsList skillGroups={skillGroups} />
    </section>
  );
}