import { ExperienceForm } from "@/features/admin/components/forms/ExperienceForm/ExperienceForm";

export default function AdminNewExperiencePage() {
  return (
    <section>
      <h1>New experience</h1>
      <ExperienceForm mode="create" />
    </section>
  );
}