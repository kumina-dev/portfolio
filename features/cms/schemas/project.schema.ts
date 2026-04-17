import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  headline: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1),
  outcomes: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  repositoryUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
  sortOrder: z.number().int(),
  overviewHeading: z.string().min(1),
  overviewContent: z.string().min(1),
  impactHeading: z.string().min(1),
  impactContent: z.string().min(1),
  technicalHeading: z.string().min(1),
  technicalContent: z.string().min(1),
});
