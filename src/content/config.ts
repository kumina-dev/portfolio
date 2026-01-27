import { defineCollection, z } from "astro:content";

const Projects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        date: z.string(), // ISO-ish "YYYY-MM-DD"
        status: z.enum(["active", "shipped", "archived"]).default("active"),
        type: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        summary: z.string(),
        impact: z.array(z.string()).default([]),
        links: z
            .object({
                repo: z.string().optional(),
                demo: z.string().optional(),
                docs: z.string().optional()
            })
            .default({}),
        metrics: z
            .object({
                lighthouse: z.number().optional(),
                bundle_kb: z.number().optional(),
                ttfb_ms: z.number().optional()
            })
            .default({}),
        images: z
            .object({
                cover: z.string().optional(),
                gallery: z.array(z.string()).default([])
            })
            .default({ gallery: [] })
    })
});

export const collections = {
    projects: Projects
};
