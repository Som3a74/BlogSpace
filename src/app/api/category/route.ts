import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany()
        if (!categories) {
            return NextResponse.json({
                message: "Categories not found",
                status: 404,
                success: false
            }, { status: 404 })
        }

        return NextResponse.json({
            data: categories,
            message: "Categories fetched successfully",
            status: 200,
            success: true,
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch categories",
            error,
            status: 500,
            success: false
        }, { status: 500 })
    }
}