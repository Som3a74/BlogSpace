import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { ResponseHelper } from "@/lib/api-response";
import { createCommentSchema, updateCommentSchema, deleteCommentSchema } from "@/lib/validations/api-schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await req.json();
        const validation = createCommentSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { articleId, content } = validation.data;

        const comment = await prisma.comment.create({
            data: {
                content,
                userId: session.user.id,
                articleId: articleId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        const res = ResponseHelper.success(comment, "Comment created successfully", 201);
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error("Comment error:", error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await req.json();
        const validation = updateCommentSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { id, content } = validation.data;

        const existingComment = await prisma.comment.findUnique({
            where: { id }
        });

        if (!existingComment) {
            const res = ResponseHelper.error(null, "Comment not found", 404);
            return NextResponse.json(res, { status: res.status });
        }

        if (existingComment.userId !== session.user.id) {
            const res = ResponseHelper.error(null, "Unauthorized", 403);
            return NextResponse.json(res, { status: res.status });
        }

        const comment = await prisma.comment.update({
            where: { id },
            data: { content },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        const res = ResponseHelper.success(comment, "Comment updated successfully");
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error("Comment edit error:", error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await req.json();
        const validation = deleteCommentSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { id } = validation.data;

        const existingComment = await prisma.comment.findUnique({
            where: { id }
        });

        if (!existingComment) {
            const res = ResponseHelper.error(null, "Comment not found", 404);
            return NextResponse.json(res, { status: res.status });
        }

        if (existingComment.userId !== session.user.id) {
            const res = ResponseHelper.error(null, "Unauthorized", 403);
            return NextResponse.json(res, { status: res.status });
        }

        await prisma.comment.delete({
            where: { id }
        });

        const res = ResponseHelper.success(null, "Comment deleted successfully");
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error("Comment delete error:", error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}
