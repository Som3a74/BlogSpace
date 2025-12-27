import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Bookmark as BookmarkIcon } from "lucide-react"
import Link from 'next/link'
import BlogContent from '../_components/BlogContent'
import BlogCard from '../_components/BlogCard'
import SharedButton from './_components/SharedButton'
import SaveButton from './_components/SaveButton'
import CommentsSection from './_components/CommentsSection'
import { notFound } from 'next/navigation'
import SpecificBlogSidebar from "./_components/SpecificBlogSidebar"
import { dataFormat } from "@/utils/dataFormat"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"

import { getArticleBySlug } from '@/lib/data/articles'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const result = await getArticleBySlug(slug);

    if (!result.success || !result.data) {
        notFound();
    }
    const data = result.data;

    // Track views
    try {
        await prisma.article.update({
            where: { id: data.id },
            data: { views: { increment: 1 } }
        });
    } catch (e) {
        console.error("View increment error:", e);
    }

    const isSaved = session ? !!(await prisma.savedArticle.findUnique({
        where: {
            userId_articleId: {
                userId: session.user.id,
                articleId: data.id
            }
        }
    })) : false;

    const comments = await prisma.comment.findMany({
        where: { articleId: data.id },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="container py-8 md:py-12 max-w-5xl mx-auto">
            {/* Back Link */}
            <div className="mb-8 flex items-center justify-between">
                <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-primary transition-all">
                    <Link href="/blog">
                        <ArrowLeft className="h-4 w-4" /> Back to Blog
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <SharedButton title={data.title} />
                    <SaveButton articleId={data.id} initialSaved={isSaved} />
                </div>
            </div>

            {/* Article Header */}
            <header className="space-y-6 mb-12 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <Badge variant="secondary" className="px-3 py-1 bg-primary/5 text-primary border-primary/10">{data.category.name}</Badge>
                    <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {dataFormat(data.createdAt.toISOString())}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded">
                        {data.views + 1 || 1} Views
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                    {data.title}
                </h1>

                <div id="author" className="flex items-center justify-center md:justify-between border-y border-slate-100 dark:border-white/5 py-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black shadow-inner">
                            {(data.user?.name || "A").charAt(0)}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{data.user?.name || "Anonymous"}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Article Author</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-4xl mb-12 shadow-2xl">
                <img
                    src={data.image || ""}
                    alt={data.title}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Content & Sidebar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <article className="lg:col-span-8" id="content">
                    <BlogContent content={data.content} proTip={data.proTip ?? undefined} />

                    {/* Discussion Section */}
                    <CommentsSection
                        articleId={data.id}
                        initialComments={comments}
                        sessionUser={session?.user}
                    />
                </article>

                {/* specific blog Sideba */}
                <aside className="lg:col-span-4">
                    <SpecificBlogSidebar />
                </aside>
            </div>
        </div>
    );
};

export default Page;