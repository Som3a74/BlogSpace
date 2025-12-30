import BlogCard from './BlogCard'
import CustomPagination from './CustomPagination'
import { getArticles } from '@/lib/data/articles'

export default async function ArticleGrid({
    searchParams
}: {
    searchParams: {
        q?: string;
        category?: string;
        page?: string;
        sort?: string;
    }
}) {
    const query = searchParams?.q || '';
    const category = searchParams?.category || '';
    const sort = searchParams?.sort || '';
    const currentPage = Number(searchParams?.page) || 1;

    const response = await getArticles({ query, category, page: currentPage, sort: sort as any });
    const { articles = [], metadata } = response.data || {};

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.length > 0 ? (
                    articles.map((post: any) => (
                        <BlogCard
                            id={post.id}
                            slug={post.slug}
                            key={post.id}
                            title={post.title}
                            content={post.content}
                            image={post.image}
                            category={post.category}
                            updatedAt={post.updatedAt}
                            createdAt={post.createdAt}
                            user={post.user}
                            views={post.views}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No articles found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {(metadata?.totalPages ?? 0) > 1 && (
                <CustomPagination totalPages={metadata?.totalPages || 0} />
            )}
        </>
    )
}
