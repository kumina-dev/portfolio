import { notFound } from "next/navigation";
import { ExperienceForm } from "@/features/admin/components/forms/ExperienceForm/ExperienceForm";
import { adminExperienceService } from "@/features/admin/server/admin-experience.service";

type AdminExperienceDetailPageProps = {
  params: Promise<{
    experienceId: string;
  }>;
};

export default async function AdminExperienceDetailPage({
  params,
}: AdminExperienceDetailPageProps) {
  const { experienceId } = await params;
  const experienceItem = await adminExperienceService.getExperienceById(experienceId);

  if (!experienceItem) {
    notFound();
  }

  return (
    <section>
      <h1>Edit experience</h1>
      <ExperienceForm mode="edit" experience={experienceItem} />
    </section>
  );
}