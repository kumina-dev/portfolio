"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { adminRoutes } from "@/features/admin/lib/admin.routes";
import { experienceSchema } from "@/features/admin/schemas/experience.schema";
import { createSupabaseServerClient } from "@/integrations/supabase/server";

function parseExperienceFormData(formData: FormData) {
  return experienceSchema.safeParse({
    role: String(formData.get("role") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
}

export async function createExperienceAction(formData: FormData) {
  await adminAuthService.requireUser();
  const parsed = parseExperienceFormData(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid experience item.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("portfolio_experience_items").insert({
    role: parsed.data.role,
    company: parsed.data.company,
    period: parsed.data.period,
    summary: parsed.data.summary,
    sort_order: parsed.data.sortOrder,
  });

  if (error) {
    throw error;
  }

  revalidatePath(adminRoutes.experience);
  revalidatePath("/");
  redirect(adminRoutes.experience);
}

export async function updateExperienceAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Experience id is required.");
  }

  const parsed = parseExperienceFormData(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid experience item.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("portfolio_experience_items")
    .update({
      role: parsed.data.role,
      company: parsed.data.company,
      period: parsed.data.period,
      summary: parsed.data.summary,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(adminRoutes.experience);
  revalidatePath(`/admin/experience/${id}`);
  revalidatePath("/");
}

export async function deleteExperienceAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Experience id is required.");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("portfolio_experience_items").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(adminRoutes.experience);
  revalidatePath("/");
  redirect(adminRoutes.experience);
}
