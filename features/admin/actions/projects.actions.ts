"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminRoutes } from "@/features/admin/lib/admin.routes";
import { adminUtils } from "@/features/admin/lib/admin.utils";
import { projectSchema } from "@/features/admin/schemas/project.schema";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { createSupabaseServerClient } from "@/integrations/supabase/server";

function parseProjectFormData(formData: FormData) {
  return projectSchema.safeParse({
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    repositoryUrl: String(formData.get("repositoryUrl") ?? "").trim(),
    liveUrl: String(formData.get("liveUrl") ?? "").trim(),
    stack: adminUtils.parseCommaSeparatedList(String(formData.get("stack") ?? "")),
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
}

export async function createProjectAction(formData: FormData) {
  await adminAuthService.requireUser();

  const parsed = parseProjectFormData(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid project.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("portfolio_projects").insert({
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: parsed.data.description,
    repository_url: parsed.data.repositoryUrl || null,
    live_url: parsed.data.liveUrl || null,
    stack: parsed.data.stack,
    featured: parsed.data.featured,
    sort_order: parsed.data.sortOrder,
  });

  if (error) {
    throw error;
  }

  revalidatePath(adminRoutes.projects);
  revalidatePath("/");
  redirect(adminRoutes.projects);
}

export async function updateProjectAction(formData: FormData) {
  await adminAuthService.requireUser();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Project id is required.");
  }

  const parsed = parseProjectFormData(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid project.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("portfolio_projects")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      repository_url: parsed.data.repositoryUrl || null,
      live_url: parsed.data.liveUrl || null,
      stack: parsed.data.stack,
      featured: parsed.data.featured,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(adminRoutes.projects);
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/");
}
