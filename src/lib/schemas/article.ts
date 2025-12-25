import { z } from "zod"

export const articleSchema = z.object({
    title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(100, { message: "Title must be less than 100 characters" }),
    slug: z
        .string()
        .min(5, { message: "Slug must be at least 5 characters long" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "Slug must contain only lowercase letters, numbers, and hyphens",
        }),
    content: z.string().min(20, { message: "Content must be at least 20 characters long" }),
    proTip: z.string().optional(),
    categoryId: z.string().min(1, { message: "Please select a category" }),
    published: z.boolean(),
    image: z.string().min(1, { message: "Cover image is required" }),
})

export type ArticleFormValues = z.infer<typeof articleSchema>
