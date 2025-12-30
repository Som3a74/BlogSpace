
import React from 'react'
import { getUserById } from '@/lib/data/users'
import { getArticles } from '@/lib/data/articles'
import BlogCard from '@/app/blog/_components/BlogCard'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, MapPin, Mail, PenTool } from "lucide-react"
import { notFound } from 'next/navigation'
import { dataFormat } from '@/utils/dataFormat'

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch Author Info
    const authorResponse = await getUserById(id);
    if (!authorResponse.success || !authorResponse.data) {
        notFound();
    }
    const author = authorResponse.data;

    // Fetch Author's Articles
    const articlesResponse = await getArticles({ authorId: id, limit: 12 });
    const articles = articlesResponse.data?.articles || [];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Profile Section */}
            <div className="bg-muted/30 border-b">
                <div className="container py-16 md:py-24 px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
                            <AvatarImage src={author.image || ""} alt={author.name} className="object-cover" />
                            <AvatarFallback className="text-4xl bg-primary/10 text-primary">{author.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="space-y-4 flex-1">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">{author.name}</h1>
                                <p className="text-muted-foreground text-lg mt-2 max-w-2xl">
                                    {author.bio || "Passionate content creator sharing insights on technology and design."}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <PenTool className="w-4 h-4 text-primary" />
                                    <span>{author._count?.articles || 0} Articles</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="w-4 h-4 text-primary" />
                                    <span>Joined {dataFormat(author.createdAt)}</span>
                                </div>
                                {author.email && (
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <span>{author.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container py-16 px-4 md:px-6">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold">Published Articles</h2>
                    <Separator className="flex-1" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.length > 0 ? (
                        articles.map((article: any) => (
                            <BlogCard
                                key={article.id}
                                {...article}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                            <p>No articles published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
