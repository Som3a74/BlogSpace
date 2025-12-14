import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="container py-8 md:py-12 max-w-5xl mx-auto">
            {/* Back Link Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-9 w-32" />
            </div>

            {/* Article Header Skeleton */}
            <header className="space-y-6 mb-12 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-10 md:h-14 w-3/4 mx-auto md:mx-0" />
                    <Skeleton className="h-10 md:h-14 w-1/2 mx-auto md:mx-0" />
                </div>

                <div className="flex items-center justify-center md:justify-between border-y py-6">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                    <div className="flex gap-2 hidden md:flex">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </div>
            </header>

            {/* Featured Image Skeleton */}
            <Skeleton className="aspect-video w-full rounded-xl mb-12" />

            {/* Content & Sidebar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-8 space-y-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />

                    <div className="space-y-4 pt-8">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    <div className="space-y-4 pt-8">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <aside className="hidden lg:block lg:col-span-4 space-y-8">
                    <div className="sticky top-24 space-y-6">
                        <div className="rounded-xl border p-6 space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>

                        <div className="rounded-xl bg-muted/50 p-6 space-y-4">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-9 w-full" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </div>
                </aside>
            </div>

            {/* Similar Articles Skeleton */}
            <section className="mt-20 pt-12 border-t">
                <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-9 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-[200px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Loading