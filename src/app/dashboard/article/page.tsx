import React from 'react'
import { headers } from "next/headers"
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { getArticlesByUserId } from '@/lib/data/articles'
import { Button } from '@/components/ui/button'
import { ArticleTable } from './_components/ArticleTable'

const ArticlesPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // properly await headers()
    })

    if (!session) {
        redirect('/')
    }

    const { data: articles } = await getArticlesByUserId(session.user.id)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
                    <p className="text-muted-foreground">
                        Manage your blog posts and content.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/article/add-article">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Article
                    </Link>
                </Button>
            </div>

            <ArticleTable articles={articles || []} />
        </div>
    )
}

export default ArticlesPage