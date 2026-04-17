import { createSupabaseServerAuthClient } from "@/integrations/supabase/server-auth";

export const adminAuthService = {
  async getSession() {
    const supabase = await createSupabaseServerAuthClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session;
  },

  async requireSession() {
    const session = await this.getSession();

    return {
      user: session?.user ?? null,
      session,
    };
  },
};