import { ProjectForm } from "@/features/admin/components/forms/ProjectForm/ProjectForm";

export default function AdminNewProjectPage() {
  return (
    <section>
      <h1>New project</h1>
      <ProjectForm mode="create" />
    </section>
  );
}
