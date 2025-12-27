import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResponseHelper } from "@/lib/api-response";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authorRequestSchema, updateAuthorRequestSchema } from "@/lib/validations/api-schemas";

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || (session.user as any).role !== "ADMIN") {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const authorRequests = await prisma.authorRequest.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const res = ResponseHelper.success(authorRequests, "Requests fetched successfully");
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error(error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await req.json();
        const validation = authorRequestSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { bio, reason } = validation.data;

        // Check if a request already exists
        const existingRequest = await prisma.authorRequest.findUnique({
            where: { userId: session.user.id }
        });

        if (existingRequest) {
            const res = ResponseHelper.error(null, "You have already submitted a request", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const authorRequest = await prisma.authorRequest.create({
            data: {
                userId: session.user.id,
                bio,
                reason,
                status: "PENDING"
            }
        });

        const res = ResponseHelper.success(authorRequest, "Application submitted successfully");
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error(error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || (session.user as any).role !== "ADMIN") {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await req.json();
        const validation = updateAuthorRequestSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { requestId, status } = validation.data;

        const authorRequest = await prisma.authorRequest.findUnique({
            where: { id: requestId },
            include: { user: true }
        });

        if (!authorRequest) {
            const res = ResponseHelper.error(null, "Request not found", 404);
            return NextResponse.json(res, { status: res.status });
        }

        const updatedRequest = await prisma.$transaction(async (tx) => {
            const request = await tx.authorRequest.update({
                where: { id: requestId },
                data: { status }
            });

            if (status === "APPROVED") {
                await tx.user.update({
                    where: { id: authorRequest.userId },
                    data: { role: "AUTHOR" }
                });
            } else if (status === "REJECTED") {
                await tx.user.update({
                    where: { id: authorRequest.userId },
                    data: { role: "USER" }
                });
            }

            return request;
        });

        const res = ResponseHelper.success(updatedRequest, `Request ${status.toLowerCase()} successfully`);
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error(error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}
