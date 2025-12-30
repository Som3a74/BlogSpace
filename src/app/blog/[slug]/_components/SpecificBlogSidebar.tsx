import { getArticles } from '@/lib/data/articles'
import Link from 'next/link'
import Image from 'next/image'

interface SpecificBlogSidebarProps {
    categoryId: number;
    currentArticleId: number;
}

const SpecificBlogSidebar = async ({ categoryId, currentArticleId }: SpecificBlogSidebarProps) => {

    const response = await getArticles({ category: categoryId.toString(), limit: 4 })
    const relatedArticles = response.data?.articles
        .filter((article: any) => article.id !== currentArticleId)
        .slice(0, 5) || []

    return (
        <aside className="sticky top-24 space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2 text-sm">
                    <a href="#author" className="block text-muted-foreground hover:text-primary transition-colors">Introduction</a>
                    <a href="#content" className="block text-muted-foreground hover:text-primary transition-colors">Content</a>
                    <a href="#popTip" className="block text-muted-foreground hover:text-primary transition-colors">popTip</a>
                </nav>
            </div>

            {relatedArticles.length > 0 && (
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                        {relatedArticles.map((article: any) => (
                            <Link href={`/blog/${article.slug}`} key={article.id} className="flex gap-3 group">
                                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
                                    <Image
                                        src={article.image || '/images/placeholder.svg'}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}

export default SpecificBlogSidebar