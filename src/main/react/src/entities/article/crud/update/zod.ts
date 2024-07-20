import z from "zod";

export const articleUpdateFormSchema = z
  .object({
    id: z.number().positive(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    content: z.string(),
    image: z.string(),
    enabled: z.boolean(),
    author: z.string(),
    dateCreated: z.date(),
  });

export type ArticleUpdateFormData = z.infer<typeof articleUpdateFormSchema>;