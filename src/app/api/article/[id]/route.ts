import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
            include: {
                user: { select: { id: true, name: true } },
                category: { select: { id: true, name: true } }
            }
        });

        if (!article) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Article ${id} Not Found`
                },
                { status: 404 }
            );
        }

        const content = {
            Introduction: article.introduction,
            ProTip: article.proTip,
            Conclusion: article.conclusion,
        };

        return NextResponse.json(
            {
                success: true,
                data: { ...article, content }
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            },
            { status: 500 }
        );
    }
}