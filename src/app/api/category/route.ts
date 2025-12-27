import { NextRequest, NextResponse } from 'next/server'
import { AddCategory, getCategories } from '@/lib/data/categories'
import { ResponseHelper } from '@/lib/api-response'
import { categorySchema } from '@/lib/validations/api-schemas'

export async function GET(request: NextRequest) {
    const result = await getCategories();
    return NextResponse.json(result, { status: result.status });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = categorySchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const result = await AddCategory(validation.data as any);
        return NextResponse.json(result, { status: result.status });
    } catch (error) {
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}