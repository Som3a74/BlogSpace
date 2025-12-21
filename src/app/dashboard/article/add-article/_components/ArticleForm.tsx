"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner"

interface Category {
    id: number
    name: string
}

interface ArticleFormProps {
    categories: Category[]
}

export function ArticleForm({ categories }: ArticleFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(false)
    const [image, setImage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        // await new Promise(resolve => setTimeout(resolve, 2000))
        const formData = new FormData(e.currentTarget)

        const data = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            content: formData.get("content"),
            proTip: formData.get("proTip"),
            published,
            categoryId: Number(formData.get("category")),
            image: image,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "cmjemgaoq0000ngdo09u35sei",
        }

        try {
            const response: any = await fetch("/api/article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setLoading(false)
            console.log(response)
            toast.success(response.message)
            // await router.push("/dashboard/article")
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            toast.error(error.message)
        }
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
                                <Input id="title" name="title" placeholder="Enter article title" required />
                            </div>

                            {/* slug input */}
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" name="slug" placeholder="Enter article slug" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Write your article content..."
                                    className="min-h-[100px]"
                                />
                            </div>


                            <div className="space-y-2">
                                <Label htmlFor="proTip">Pro Tip</Label>
                                <Textarea
                                    id="proTip"
                                    name="proTip"
                                    placeholder="Share a valuable tip..."
                                    className="min-h-[100px] bg-sky-50 dark:bg-sky-950/20"
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
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                        <ImageIcon className="h-6 w-6 text-secondary-foreground" />
                                    </div>
                                    <div className="mt-4 flex flex-col items-center justify-center space-y-2">
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                // console.log("Files: ", res);
                                                setImage(res[0].ufsUrl)
                                                toast.success("Upload Completed" + res[0].ufsUrl);
                                            }}
                                            onUploadError={(error: Error) => {
                                                toast.error(`ERROR! ${error.message}`);
                                            }}
                                            appearance={{
                                                button: "underline text-black!",
                                                allowedContent: "text-primary"
                                            }}
                                        />
                                    </div>
                                </div>
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
