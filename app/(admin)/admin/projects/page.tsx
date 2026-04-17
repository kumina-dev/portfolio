import Link from "next/link";
import { adminProjectsService } from "@/features/admin/server/admin-projects.service";
import styles from "./page.module.css";
import { ProjectsTable } from "@/features/admin/components/lists/ProjectsTable/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await adminProjectsService.listProjects();
  
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.description}>Manage portfolio projects and sort order.</p>
        </div>

        <Link className={styles.createLink} href="/admin/projects/new">
          New project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </section>
  )
}