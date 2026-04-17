export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cms_experience_items: {
        Row: {
          company: string
          highlights: string[]
          id: string
          period: string
          published_at: string | null
          role: string
          sort_order: number
          status: Database["public"]["Enums"]["publishing_status"]
          summary: string
          updated_at: string
        }
        Insert: {
          company: string
          highlights?: string[]
          id?: string
          period: string
          published_at?: string | null
          role: string
          sort_order?: number
          status?: Database["public"]["Enums"]["publishing_status"]
          summary: string
          updated_at?: string
        }
        Update: {
          company?: string
          highlights?: string[]
          id?: string
          period?: string
          published_at?: string | null
          role?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["publishing_status"]
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_profile: {
        Row: {
          availability: string
          email: string
          featured_label: string
          github_url: string
          hero_intro: string
          id: string
          location: string | null
          name: string
          published_at: string | null
          status: Database["public"]["Enums"]["publishing_status"]
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          availability: string
          email: string
          featured_label: string
          github_url: string
          hero_intro: string
          id?: string
          location?: string | null
          name: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["publishing_status"]
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          availability?: string
          email?: string
          featured_label?: string
          github_url?: string
          hero_intro?: string
          id?: string
          location?: string | null
          name?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["publishing_status"]
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_project_sections: {
        Row: {
          content: string
          heading: string
          id: string
          project_id: string
          section_key: string
          sort_order: number
        }
        Insert: {
          content: string
          heading: string
          id?: string
          project_id: string
          section_key: string
          sort_order?: number
        }
        Update: {
          content?: string
          heading?: string
          id?: string
          project_id?: string
          section_key?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "cms_project_sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "cms_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_projects: {
        Row: {
          cover_image_url: string | null
          featured: boolean
          headline: string
          id: string
          live_url: string | null
          outcomes: string
          published_at: string | null
          repository_url: string | null
          role: string
          slug: string
          sort_order: number
          stack: string[]
          status: Database["public"]["Enums"]["publishing_status"]
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          featured?: boolean
          headline: string
          id?: string
          live_url?: string | null
          outcomes: string
          published_at?: string | null
          repository_url?: string | null
          role: string
          slug: string
          sort_order?: number
          stack?: string[]
          status?: Database["public"]["Enums"]["publishing_status"]
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          featured?: boolean
          headline?: string
          id?: string
          live_url?: string | null
          outcomes?: string
          published_at?: string | null
          repository_url?: string | null
          role?: string
          slug?: string
          sort_order?: number
          stack?: string[]
          status?: Database["public"]["Enums"]["publishing_status"]
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_skill_groups: {
        Row: {
          description: string
          id: string
          published_at: string | null
          sort_order: number
          status: Database["public"]["Enums"]["publishing_status"]
          title: string
          updated_at: string
        }
        Insert: {
          description: string
          id?: string
          published_at?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["publishing_status"]
          title: string
          updated_at?: string
        }
        Update: {
          description?: string
          id?: string
          published_at?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["publishing_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_skill_items: {
        Row: {
          emphasis: string | null
          id: string
          label: string
          skill_group_id: string
          sort_order: number
        }
        Insert: {
          emphasis?: string | null
          id?: string
          label: string
          skill_group_id: string
          sort_order?: number
        }
        Update: {
          emphasis?: string | null
          id?: string
          label?: string
          skill_group_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "cms_skill_items_skill_group_id_fkey"
            columns: ["skill_group_id"]
            isOneToOne: false
            referencedRelation: "cms_skill_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_experience_items: {
        Row: {
          company: string
          id: string
          period: string
          role: string
          sort_order: number
          summary: string
          updated_at: string
        }
        Insert: {
          company: string
          id?: string
          period: string
          role: string
          sort_order?: number
          summary: string
          updated_at?: string
        }
        Update: {
          company?: string
          id?: string
          period?: string
          role?: string
          sort_order?: number
          summary?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_profile: {
        Row: {
          email: string
          github_url: string
          id: string
          location: string | null
          name: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          email: string
          github_url: string
          id?: string
          location?: string | null
          name: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          email?: string
          github_url?: string
          id?: string
          location?: string | null
          name?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          description: string
          featured: boolean
          id: string
          live_url: string | null
          repository_url: string | null
          slug: string
          sort_order: number
          stack: string[]
          title: string
          updated_at: string
        }
        Insert: {
          description: string
          featured?: boolean
          id?: string
          live_url?: string | null
          repository_url?: string | null
          slug: string
          sort_order?: number
          stack?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          description?: string
          featured?: boolean
          id?: string
          live_url?: string | null
          repository_url?: string | null
          slug?: string
          sort_order?: number
          stack?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_roadmap_items: {
        Row: {
          id: string
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_skill_groups: {
        Row: {
          id: string
          items: string[]
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          id?: string
          items?: string[]
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          id?: string
          items?: string[]
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      save_cms_project: {
        Args: {
          p_id?: string | null
          p_slug: string
          p_title: string
          p_headline: string
          p_summary: string
          p_role: string
          p_outcomes: string
          p_stack: string[]
          p_repository_url?: string | null
          p_live_url?: string | null
          p_cover_image_url?: string | null
          p_featured?: boolean
          p_sort_order?: number
          p_status: Database["public"]["Enums"]["publishing_status"]
          p_published_at?: string | null
          p_sections: Json
        }
        Returns: string
      }
      save_cms_skill_group: {
        Args: {
          p_id?: string | null
          p_title: string
          p_description: string
          p_sort_order?: number
          p_status: Database["public"]["Enums"]["publishing_status"]
          p_published_at?: string | null
          p_items: Json
        }
        Returns: string
      }
    }
    Enums: {
      publishing_status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      publishing_status: ["draft", "published"],
    },
  },
} as const
