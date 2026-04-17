import { notFound } from "next/navigation";
import { ProjectForm } from "@/features/admin/components/forms/ProjectForm/ProjectForm";
import { adminProjectsService } from "@/features/admin/server/admin-projects.service";

type AdminProjectDetailPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function AdminProjectDetailPage({
  params,
}: AdminProjectDetailPageProps) {
  const { projectId } = await params;
  const project = await adminProjectsService.getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <section>
      <h1>Edit project</h1>
      <ProjectForm mode="edit" project={project} />
    </section>
  );
}