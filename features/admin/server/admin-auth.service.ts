import { redirect } from "next/navigation";
import { createSupabaseServerAuthClient } from "@/integrations/supabase/server-auth";

export const adminAuthService = {
  async getVerifiedUser() {
    const supabase = await createSupabaseServerAuthClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      if (error.name === "AuthSessionMissingError") {
        return null;
      }

      throw error;
    }

    return user;
  },

  async requireUser() {
    const user = await this.getVerifiedUser();

    if (!user) {
      redirect("/admin/login");
    }

    return {
      user,
    };
  },
};
