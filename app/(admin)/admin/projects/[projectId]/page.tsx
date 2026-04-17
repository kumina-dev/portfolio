import { notFound } from "next/navigation";
import { ProjectEditor } from "@/features/cms/components/admin/ProjectEditor/ProjectEditor";
import { getCmsProjectEditorData } from "@/features/cms/queries/cms-admin.queries";

type AdminProjectDetailPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function AdminProjectDetailPage({
  params,
}: AdminProjectDetailPageProps) {
  const { projectId } = await params;
  const project = await getCmsProjectEditorData(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectEditor projectBundle={project} />;
}
