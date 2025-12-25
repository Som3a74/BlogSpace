import React from 'react'
import prisma from '@/lib/prisma'
import { ArticleForm } from './_components/ArticleForm'
import { getArticleById } from '@/lib/data/articles'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const AddArticlePage = async ({ searchParams }: PageProps) => {
    const { id, mode } = await searchParams

    let initialData = null

    if (mode === 'edit' && id && typeof id === 'string') {
        const response = await getArticleById(id)
        if (response.success && response.data) {
            initialData = response.data
        }
    }

    // Fetch categories for the form
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {initialData ? "Edit Article" : "Add New Article"}
                    </h2>
                    <p className="text-muted-foreground">
                        {initialData ? "Update your existing blog post." : "Create a new blog post for your audience."}
                    </p>
                </div>
            </div>

            <ArticleForm categories={categories} initialData={initialData} />
        </div>
    )
}

export default AddArticlePage