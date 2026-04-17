import { ProjectsCollection } from "@/features/cms/components/admin/ProjectsCollection/ProjectsCollection";
import { getCmsProjectsCollectionData } from "@/features/cms/queries/cms-admin.queries";

export default async function AdminProjectsPage() {
  const projects = await getCmsProjectsCollectionData();
  return <ProjectsCollection projects={projects} />;
}
