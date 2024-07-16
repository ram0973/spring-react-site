import z from "zod";

const MAX_IMAGE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const articleCreateFormSchema = z
  .object({
    title: z.string().max(255, "Title must not exceed 255 symbols"),
    slug: z.string(),
    image: //z.any(),
    //z.instanceof(FileList)
      typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
        .refine((image) => image?.length === 0 || (image[0]?.size < MAX_IMAGE_SIZE), `Max file size is 3MB.`)
        .refine(
          (image) => image?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(image?.[0]?.type),
          ".jpg, .jpeg, .png and .webp files are accepted."
        ),
    //.refine((file) => file?.length == 0, 'File is required.'),
    //.refine((files) => files[0] && (files[0]?.size >= MAX_IMAGE_SIZE), `Max file size is 3MB.`), // this should be greater than or equals (>=) not less that or equals (<=)
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // ),
    //image: typeof window === 'undefined' ? z.null() : z.instanceof(File),
    //image:
    //.any()
    //.refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE, `Max image size is 3MB.`)
    //.refine(
    //  (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    //  "Only .jpg, .jpeg, .png and .webp formats are supported."
    //),
    excerpt: z.string(),
    content: z.string(),
    enabled: z.boolean(),
  });

export type ArticleCreateFormData = z.infer<typeof articleCreateFormSchema>;
