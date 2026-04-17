import { notFound } from "next/navigation";
import { ExperienceEditor } from "@/features/cms/components/admin/ExperienceEditor/ExperienceEditor";
import { getCmsExperienceEditorData } from "@/features/cms/queries/cms-admin.queries";

type AdminExperienceDetailPageProps = {
  params: Promise<{
    experienceId: string;
  }>;
};

export default async function AdminExperienceDetailPage({
  params,
}: AdminExperienceDetailPageProps) {
  const { experienceId } = await params;
  const experienceItem = await getCmsExperienceEditorData(experienceId);

  if (!experienceItem) {
    notFound();
  }

  return <ExperienceEditor experience={experienceItem} />;
}
