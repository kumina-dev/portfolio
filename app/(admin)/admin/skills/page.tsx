import { SkillGroupsCollection } from "@/features/cms/components/admin/SkillGroupsCollection/SkillGroupsCollection";
import { getCmsSkillGroupsCollectionData } from "@/features/cms/queries/cms-admin.queries";

export default async function AdminSkillsPage() {
  const skillGroups = await getCmsSkillGroupsCollectionData();
  return <SkillGroupsCollection groups={skillGroups} />;
}
