import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResponseHelper } from "@/lib/api-response";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { updateProfileSchema } from "@/lib/validations/api-schemas";
import { revalidatePath } from "next/cache";

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            const res = ResponseHelper.error(null, "Unauthorized", 401);
            return NextResponse.json(res, { status: res.status });
        }

        const body = await req.json();
        const validation = updateProfileSchema.safeParse(body);

        if (!validation.success) {
            const res = ResponseHelper.error(validation.error.flatten(), "Validation Error", 400);
            return NextResponse.json(res, { status: res.status });
        }

        const { name, image } = validation.data;

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                image
            }
        });

        revalidatePath("/", "layout");

        const res = ResponseHelper.success(updatedUser, "Profile updated successfully");
        return NextResponse.json(res, { status: res.status });
    } catch (error) {
        console.error(error);
        const res = ResponseHelper.error(error);
        return NextResponse.json(res, { status: res.status });
    }
}
