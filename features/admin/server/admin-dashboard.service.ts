import { createSupabaseServerClient } from "@/integrations/supabase/server";

export const adminDashboardService = {
  async getSummary() {
    const supabase = await createSupabaseServerClient();

    const [projectsResult, skillGroupsResult, experienceResult] = await Promise.all([
      supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
      supabase.from("portfolio_skill_groups").select("id", { count: "exact", head: true }),
      supabase.from("portfolio_experience_items").select("id", { count: "exact", head: true }),
    ]);

    if (projectsResult.error) throw projectsResult.error;
    if (skillGroupsResult.error) throw skillGroupsResult.error;
    if (experienceResult.error) throw experienceResult.error;

    return {
      projectCount: projectsResult.count ?? 0,
      skillGroupCount: skillGroupsResult.count ?? 0,
      experienceCount: experienceResult.count ?? 0,
    };
  },
};