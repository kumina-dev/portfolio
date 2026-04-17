"use server";

import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/features/admin/lib/admin.routes";
import { profileSchema } from "@/features/admin/schemas/profile.schema";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { createSupabaseServerClient } from "@/integrations/supabase/server";

export async function updateProfileAction(formData: FormData) {
  await adminAuthService.requireUser();

  const parsed = profileSchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    githubUrl: String(formData.get("githubUrl") ?? "").trim(),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid profile.");
  }

  const supabase = await createSupabaseServerClient();
  const existingProfile = await supabase.from("portfolio_profile").select("id").maybeSingle();

  if (existingProfile.error) {
    throw existingProfile.error;
  }

  if (existingProfile.data) {
    const { error } = await supabase
      .from("portfolio_profile")
      .update({
        name: parsed.data.name,
        title: parsed.data.title,
        summary: parsed.data.summary,
        location: parsed.data.location || null,
        email: parsed.data.email,
        github_url: parsed.data.githubUrl,
      })
      .eq("id", existingProfile.data.id);

    if (error) {
      throw error;
    }
  } else {
    const { error } = await supabase.from("portfolio_profile").insert({
      name: parsed.data.name,
      title: parsed.data.title,
      summary: parsed.data.summary,
      location: parsed.data.location || null,
      email: parsed.data.email,
      github_url: parsed.data.githubUrl,
    });

    if (error) {
      throw error;
    }
  }

  revalidatePath(adminRoutes.profile);
  revalidatePath("/");
}
