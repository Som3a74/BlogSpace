import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/article
export async function GET(request: NextRequest) {
    try {
        const articles = await prisma.article.findMany({
            include: {
                user: { select: { id: true, name: true } },
                category: { select: { id: true, name: true } }
            }
        })

        type ArticleType = (typeof articles)[number]

        const formattedArticles = articles.map((article: ArticleType) => {
            const { introduction, proTip, conclusion, ...rest } = article

            return {
                ...rest,
                content: {
                    introduction,
                    proTip,
                    conclusion
                }
            }
        })

        return NextResponse.json(
            {
                data: formattedArticles,
                status: 200,
                success: true,
                message: "Articles fetched successfully",
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error',
                error: error instanceof Error ? error.message : error
            },
            { status: 500 }
        )
    }
}