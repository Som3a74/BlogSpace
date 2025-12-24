"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import RichTextEditor from "@/components/toolbars/RichTextEditor"
import { authClient } from "@/lib/auth-client"
import { ImageUploadInput } from "./ImageUploadInput"

interface Category {
    id: number
    name: string
}

interface ArticleFormProps {
    categories: Category[]
}

export function ArticleForm({ categories }: ArticleFormProps) {
    const router = useRouter()
    const { data: userData } = authClient.useSession()
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(false)
    const [content, setContent] = useState<string>("")
    const [image, setImage] = useState<string | null>(null)
    const [slug, setSlug] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        // await new Promise(resolve => setTimeout(resolve, 2000))
        const formData = new FormData(e.currentTarget)

        const data = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            content: content,
            proTip: formData.get("proTip"),
            published,
            categoryId: Number(formData.get("category")),
            image: image,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: userData?.user.id,
        }

        try {
            const response = await fetch("/api/article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            setLoading(false)

            if (response.ok) {
                toast.success(result.message || "Article created successfully")
                router.push("/dashboard/article")
            } else {
                toast.error(result.message || "Something went wrong")
            }
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            toast.error("Failed to connect to the server")
        }
    }

    const slugGenerator = (title: string) => {
        const slug = title
        const slugified = slug.replace(/\s+/g, "-").toLowerCase()
        return slugified
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Article Details</CardTitle>
                            <CardDescription>
                                Give your article a clear title and structure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" placeholder="Enter article title" required onChange={(e) => setSlug(slugGenerator(e.target.value))} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="Enter article slug"
                                    required
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <RichTextEditor
                                    content={content}
                                    onChange={setContent}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="proTip">Pro Tip</Label>
                                <Textarea
                                    id="proTip"
                                    name="proTip"
                                    placeholder="Share a valuable tip..."
                                    className="min-h-25 bg-sky-50 dark:bg-sky-950/20"
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Published</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Make this article visible to everyone.
                                    </p>
                                </div>
                                <Switch id="published" name="published"
                                    checked={published}
                                    onCheckedChange={setPublished}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select name="category">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Cover Image</Label>
                                <ImageUploadInput value={image} onChange={setImage} />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? "Saving..." : "Save Article"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </form>
    )
}
