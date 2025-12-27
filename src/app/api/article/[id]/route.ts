import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle } from '@/lib/data/articles'
import { ResponseHelper } from '@/lib/api-response'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getArticleById(id);
    return NextResponse.json(result, { status: result.status });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const result = await updateArticle(Number(id), body);
        return NextResponse.json(result, { status: result.status });
    } catch (error) {
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}