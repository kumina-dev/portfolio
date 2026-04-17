import Link from "next/link";
import type { PortfolioProject } from "@/features/portfolio/types/portfolio";
import styles from "./ProjectsTable.module.css";

type ProjectsTableProps = {
  projects: PortfolioProject[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Featured</th>
            <th>Sort</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.featured ? "Yes" : "No"}</td>
              <td>{project.sortOrder}</td>
              <td>
                <Link href={`/admin/projects/${project.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}