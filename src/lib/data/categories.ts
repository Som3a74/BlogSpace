import prisma from '@/lib/prisma'
import { TCategory } from '@/types/category'

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany()
        if (!categories) {
            return {
                message: "Categories not found",
                status: 404,
                success: false,
                data: []
            }
        }

        return {
            data: categories,
            message: "Categories fetched successfully",
            status: 200,
            success: true,
        }


    } catch (error) {
        return {
            message: "Failed to fetch categories",
            error: error instanceof Error ? error.message : error,
            status: 500,
            success: false,
            data: []
        }
    }
}

export async function AddCategory(data: TCategory) {
    const categoryData = await data

    try {
        const category = await prisma.category.create({
            data: {
                name: categoryData.name,
            }
        })

        return {
            success: true,
            data: category,
            message: "Category created successfully",
            status: 201
        }

    } catch (error: any) {
        if (error.code === 'P2002') {
            return {
                success: false,
                message: 'Category with this name already exists',
                error: error.message,
                status: 409, // Conflict
                data: null
            }
        }
        return {
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : "Unknown error",
            status: 500,
            data: null
        }
    }
}
