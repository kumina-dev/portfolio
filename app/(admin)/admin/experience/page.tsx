import { ExperienceCollection } from "@/features/cms/components/admin/ExperienceCollection/ExperienceCollection";
import { getCmsExperienceCollectionData } from "@/features/cms/queries/cms-admin.queries";

export default async function AdminExperiencePage() {
  const experience = await getCmsExperienceCollectionData();
  return <ExperienceCollection experience={experience} />;
}
