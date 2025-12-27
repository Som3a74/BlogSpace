import { z } from "zod";

// --- Article Schemas ---

export const createArticleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.any(), // Flexible for TipTap JSON or string
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),
    categoryId: z.number(),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-0-]+$/, "Slug must be lowercase alphanumeric and hyphens only"),
    proTip: z.string().optional(),
});

// --- Comment Schemas ---

export const createCommentSchema = z.object({
    articleId: z.number(),
    content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
});

export const updateCommentSchema = z.object({
    id: z.number(),
    content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
});

export const deleteCommentSchema = z.object({
    id: z.number(),
});

// --- Article Save Schema ---

export const toggleSaveSchema = z.object({
    articleId: z.number(),
});

// --- Category Schema ---

export const categorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
});

// --- Auth Schemas ---

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- User Profile Schema ---

export const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),
    bio: z.string().optional(),
});

// --- Author Request Schema ---

export const authorRequestSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    reason: z.string().min(20, "Reason must be at least 20 characters"),
});

export const updateAuthorRequestSchema = z.object({
    requestId: z.number(),
    status: z.enum(["APPROVED", "REJECTED"]),
});
