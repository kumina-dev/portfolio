import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/features/site/components/ProjectDetailPage/ProjectDetailPage";
import { getProjectDetailViewModel } from "@/features/site/queries/site-content.queries";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectDetailViewModel(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} preview={(await draftMode()).isEnabled} />;
}
