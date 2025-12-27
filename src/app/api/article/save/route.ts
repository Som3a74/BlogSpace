import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ResponseHelper } from "@/lib/api-response";
import { toggleSaveSchema } from "@/lib/validations/api-schemas";

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
        const validation = toggleSaveSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { articleId } = validation.data;

        const existingSave = await prisma.savedArticle.findUnique({
            where: {
                userId_articleId: {
                    userId: session.user.id,
                    articleId: articleId,
                },
            },
        });

        if (existingSave) {
            await prisma.savedArticle.delete({
                where: { id: existingSave.id },
            });
            const res = ResponseHelper.success({ saved: false }, "Article removed from saved");
            return NextResponse.json(res, { status: res.status });
        } else {
            await prisma.savedArticle.create({
                data: {
                    userId: session.user.id,
                    articleId: articleId,
                },
            });
            const res = ResponseHelper.success({ saved: true }, "Article saved successfully", 201);
            return NextResponse.json(res, { status: res.status });
        }
    } catch (error) {
        console.error("Save error:", error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}
