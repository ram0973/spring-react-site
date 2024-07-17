import z from "zod";

const MAX_IMAGE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];

export const articleCreateFormSchema = z
  .object({
    title: z.string().max(255, "Title must not exceed 255 symbols"),
    slug: z.string(),
    image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
      .refine((image) => image?.length === 0 || (image[0]?.size < MAX_IMAGE_SIZE), `Max file size is 3MB`)
      .refine(
        (image) => image?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(image?.[0]?.type),
        ".jpg, .jpeg, .png, .webp, .avif files are accepted only"
      ),
    excerpt: z.string(),
    content: z.string(),
    enabled: z.boolean(),
  });

export type ArticleCreateFormData = z.infer<typeof articleCreateFormSchema>;
