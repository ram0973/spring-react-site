import z from "zod";

const MAX_IMAGE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const articleCreateFormSchema = z
  .object({
    title: z.string().max(255, "Title must not exceed 255 symbols"),
    slug: z.string(),
    image: z
      .any()
      .refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE, `Max image size is 3MB.`)
      .refine(
        (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    excerpt: z.string(),
    content: z.string(),
    enabled: z.boolean(),
  });

export type ArticleCreateFormData = z.infer<typeof articleCreateFormSchema>;
