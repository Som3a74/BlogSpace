"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import RichTextEditor from "@/components/toolbars/RichTextEditor"
import { authClient } from "@/lib/auth-client"
import { ImageUploadInput } from "./ImageUploadInput"
import { articleSchema, ArticleFormValues } from "@/lib/schemas/article"
import { TArticle } from "@/types/article"

interface Category {
    id: number
    name: string
}

interface ArticleFormProps {
    categories: Category[]
    initialData?: (Partial<TArticle> & { id: number } & Record<string, any>) | null
}

export function ArticleForm({ categories, initialData }: ArticleFormProps) {
    const router = useRouter()
    const { data: userData } = authClient.useSession()

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            slug: initialData?.slug ?? "",
            content: initialData?.content ?? "",
            proTip: initialData?.proTip ?? "",
            published: initialData?.published ?? false,
            categoryId: initialData?.categoryId?.toString() ?? "",
            image: initialData?.image ?? "",
        },
    })

    const { watch, setValue, formState: { isSubmitting, dirtyFields } } = form

    const title = watch("title")

    // Auto-generate slug from title
    useEffect(() => {
        if (title && !dirtyFields.slug) {
            const generatedSlug = title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "")

            setValue("slug", generatedSlug, {
                shouldValidate: true,
                shouldDirty: false
            })
        }
    }, [title, setValue, dirtyFields.slug])

    const onSubmit = async (values: ArticleFormValues) => {
        const payload = {
            ...values,
            categoryId: Number(values.categoryId),
            userId: userData?.user.id,
            updatedAt: new Date(),
            ...(initialData ? {} : { createdAt: new Date() })
        }

        try {
            const url = initialData ? `/api/article/${initialData.id}` : "/api/article"
            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success(result.message || (initialData ? "Article updated" : "Article created"))
                router.push("/dashboard/article")
                router.refresh()
            } else {
                toast.error(result.message || "Something went wrong")
            }
        } catch (error) {
            console.error(error)
            toast.error("Network error")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>{initialData ? "Edit Article" : "New Article"}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="url-friendly-slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <div className="min-h-80 border rounded-md">
                                                    <RichTextEditor
                                                        content={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="proTip"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pro Tip (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Share a tip..."
                                                    className="bg-sky-50 dark:bg-sky-950/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="published"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <FormLabel>Published</FormLabel>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((c) => (
                                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <ImageUploadInput value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {initialData ? "Update Article" : "Create Article"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
