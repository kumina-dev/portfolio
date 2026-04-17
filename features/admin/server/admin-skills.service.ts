import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { mapSkillGroup } from "@/features/portfolio/server/portfolio.mapper";

export const adminSkillsService = {
  async listSkillGroups() {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("portfolio_skill_groups")
      .select("*")
      .order("sort_order", { ascending: true });

    if (result.error) {
      throw result.error;
    }

    return (result.data ?? []).map(mapSkillGroup);
  },

  async getSkillGroupById(skillGroupId: string) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("portfolio_skill_groups")
      .select("*")
      .eq("id", skillGroupId)
      .maybeSingle();

    if (result.error) {
      throw result.error;
    }

    return result.data ? mapSkillGroup(result.data) : null;
  },
};