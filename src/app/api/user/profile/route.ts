import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResponseHelper } from "@/lib/api-response";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name, image } = await req.json();

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                image
            }
        });

        return NextResponse.json(ResponseHelper.success(updatedUser, "Profile updated successfully"));
    } catch (error) {
        console.error(error);
        return NextResponse.json(ResponseHelper.error(error, "Internal Server Error"), { status: 500 });
    }
}
