import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResponseHelper } from "@/lib/api-response";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { bio, reason } = await req.json();

        // Check if a request already exists
        const existingRequest = await prisma.authorRequest.findUnique({
            where: { userId: session.user.id }
        });

        if (existingRequest) {
            return NextResponse.json(ResponseHelper.error(null, "You have already submitted a request"), { status: 400 });
        }

        const authorRequest = await prisma.authorRequest.create({
            data: {
                userId: session.user.id,
                bio,
                reason,
                status: "PENDING"
            }
        });

        return NextResponse.json(ResponseHelper.success(authorRequest, "Application submitted successfully"));
    } catch (error) {
        console.error(error);
        return NextResponse.json(ResponseHelper.error(error, "Internal Server Error"), { status: 500 });
    }
}
