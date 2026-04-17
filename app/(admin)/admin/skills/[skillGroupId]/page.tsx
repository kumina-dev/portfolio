import { notFound } from "next/navigation";
import { SkillGroupForm } from "@/features/admin/components/forms/SkillGroupForm/SkillGroupForm";
import { adminSkillsService } from "@/features/admin/server/admin-skills.service";

type AdminSkillGroupDetailPageProps = {
  params: Promise<{
    skillGroupId: string;
  }>;
};

export default async function AdminSkillGroupDetailPage({
  params,
}: AdminSkillGroupDetailPageProps) {
  const { skillGroupId } = await params;
  const skillGroup = await adminSkillsService.getSkillGroupById(skillGroupId);

  if (!skillGroup) {
    notFound();
  }

  return (
    <section>
      <h1>Edit skill group</h1>
      <SkillGroupForm mode="edit" skillGroup={skillGroup} />
    </section>
  );
}
