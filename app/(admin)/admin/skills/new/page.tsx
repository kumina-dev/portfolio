import { SkillGroupForm } from "@/features/admin/components/forms/SkillGroupForm/SkillGroupForm";

export default function AdminNewSkillGroupPage() {
  return (
    <section>
      <h1>New skill group</h1>
      <SkillGroupForm mode="create" />
    </section>
  );
}
