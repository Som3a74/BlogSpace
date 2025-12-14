import { NextRequest, NextResponse } from 'next/server'
import { AddCategory, getCategories } from '@/lib/data/categories'
import { TCategory } from '@/types/category';

export async function GET(request: NextRequest) {
    const result = await getCategories();
    return NextResponse.json(result, { status: result.status });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const result = await AddCategory(body as TCategory);
    return NextResponse.json(result, { status: result.status });
}    