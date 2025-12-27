import { NextRequest, NextResponse } from 'next/server'
import { getArticles, addArticle } from '@/lib/data/articles'
import { ResponseHelper } from '@/lib/api-response'
import { createArticleSchema } from '@/lib/validations/api-schemas'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

// GET /api/article
export async function GET(request: NextRequest) {
    const result = await getArticles();
    return NextResponse.json(result, { status: result.status });
}

// POST /api/article
export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await request.json();
        const validation = createArticleSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const articleData = {
            ...validation.data,
            userId: session.user.id,
            published: true, // Default to published for now
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await addArticle(articleData as any);
        return NextResponse.json(result, { status: result.status });
    } catch (error) {
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}
