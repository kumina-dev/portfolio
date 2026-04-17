import { ProfileEditor } from "@/features/cms/components/admin/ProfileEditor/ProfileEditor";
import { getCmsProfileEditorData } from "@/features/cms/queries/cms-admin.queries";

export default async function AdminProfilePage() {
  const profile = await getCmsProfileEditorData();
  return <ProfileEditor profile={profile} />;
}
