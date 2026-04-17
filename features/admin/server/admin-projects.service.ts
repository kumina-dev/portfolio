import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { mapProject } from "@/features/portfolio/server/portfolio.mapper";

export const adminProjectsService = {
  async listProjects() {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (result.error) {
      throw result.error;
    }

    return (result.data ?? []).map(mapProject);
  },

  async getProjectById(projectId: string) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("id", projectId)
      .maybeSingle();

    if (result.error) {
      throw result.error;
    }

    return result.data ? mapProject(result.data) : null;
  },
};