import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    locale: z.enum(["en", "fi"]),
  }),
});

export const collections = { blog };
