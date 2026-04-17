import { z } from "zod";

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)),
  sortOrder: z.number().int(),
});