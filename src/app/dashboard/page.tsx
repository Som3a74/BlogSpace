import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from "react";
import { DashboardStats } from "./_components/DashboardStats";
import DashboardLoading from "./loading";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || (session.user.role !== "AUTHOR" && session.user.role !== "ADMIN")) {
        redirect("/");
    }

    const popularCategories = await prisma.category.findMany({
        take: 3,
        include: {
            _count: {
                select: { articles: true }
            }
        },
        orderBy: {
            articles: {
                _count: 'desc'
            }
        }
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your blog performance.</p>
            </div>

            <Suspense fallback={<DashboardLoading />}>
                <DashboardStats userId={session.user.id} />
            </Suspense>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Coming soon: Live activity feed.
                        </p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Global Popular Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {popularCategories.map((cat) => (
                                <div key={cat.id} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{cat.name}</p>
                                        <p className="text-xs text-muted-foreground">{cat._count.articles} articles</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
