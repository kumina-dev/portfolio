"use server";

import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/features/admin/lib/admin.routes";
import { adminUtils } from "@/features/admin/lib/admin.utils";
import { skillGroupSchema } from "@/features/admin/schemas/skill-group.schema";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { createSupabaseServerClient } from "@/integrations/supabase/server";

export async function updateSkillGroupAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Skill group id is required.");
  }

  const parsed = skillGroupSchema.safeParse({
    title: String(formData.get("title") ?? "").trim(),
    items: adminUtils.parseCommaSeparatedList(String(formData.get("items") ?? "")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid skill group.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("portfolio_skill_groups")
    .update({
      title: parsed.data.title,
      items: parsed.data.items,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(adminRoutes.skills);
  revalidatePath(`/admin/skills/${id}`);
  revalidatePath("/");
}
