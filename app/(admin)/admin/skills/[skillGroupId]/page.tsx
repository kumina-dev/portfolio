import { notFound } from "next/navigation";
import { SkillGroupEditor } from "@/features/cms/components/admin/SkillGroupEditor/SkillGroupEditor";
import { getCmsSkillGroupEditorData } from "@/features/cms/queries/cms-admin.queries";

type AdminSkillGroupDetailPageProps = {
  params: Promise<{
    skillGroupId: string;
  }>;
};

export default async function AdminSkillGroupDetailPage({
  params,
}: AdminSkillGroupDetailPageProps) {
  const { skillGroupId } = await params;
  const skillGroup = await getCmsSkillGroupEditorData(skillGroupId);

  if (!skillGroup) {
    notFound();
  }

  return <SkillGroupEditor skillGroupBundle={skillGroup} />;
}
