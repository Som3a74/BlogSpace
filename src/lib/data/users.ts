import prisma from '@/lib/prisma'
import { ResponseHelper } from '@/lib/api-response'

export async function getAuthors() {
    try {
        const authors = await prisma.user.findMany({
            where: {
                OR: [
                    { role: 'AUTHOR' },
                    { articles: { some: {} } }
                ]
            },
            select: {
                id: true,
                name: true,
                image: true,
                _count: {
                    select: { articles: true }
                },
                // Bio is structurally in authorRequest for now based on schema
                authorRequest: {
                    select: {
                        bio: true
                    }
                }
            },
            take: 10 // Limit for slider
        })

        // Map to flatten structure if needed, or just return as is
        const formattedAuthors = authors.map((author: any) => ({
            ...author,
            bio: author.authorRequest?.bio || "Content Creator"
        }))

        return ResponseHelper.success(formattedAuthors, "Authors fetched successfully");

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, []);
    }
}

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                _count: { select: { articles: true } },
                authorRequest: { select: { bio: true } }
            }
        });

        if (!user) {
            return ResponseHelper.error(null, "User not found", 404, null);
        }

        return ResponseHelper.success({
            ...user,
            bio: user.authorRequest?.bio || ""
        }, "User fetched successfully");

    } catch (error) {
        return ResponseHelper.error(error, 'Internal Server Error', 500, null);
    }
}
