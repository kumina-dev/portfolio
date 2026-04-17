import { DashboardCard } from "@/features/admin/components/DashboardCard/DashboardCard";
import { adminDashboardService } from "@/features/admin/server/admin-dashboard.service";
import styles from "./page.module.css";

export default async function AdminDashboardPage() {
  const summary = await adminDashboardService.getSummary();
  
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>
          Minimal control panel for portfolio content. Civilization peaked here.
        </p>
      </div>

      <div className={styles.grid}>
        <DashboardCard
          title="Profile"
          value="1"
          description="Public identity and summary"
          href="/admin/profile"
        />
        <DashboardCard
          title="Projects"
          value={String(summary.projectCount)}
          description="Featured and archived work"
          href="/admin/projects"
        />
        <DashboardCard
          title="Skills"
          value={String(summary.skillGroupCount)}
          description="Grouped stack and capabilities"
          href="/admin/skills"
        />
        <DashboardCard
          title="Experience"
          value={String(summary.experienceCount)}
          description="Timeline entries"
          href="/admin/experience"
        />
      </div>
    </section>
  );
}