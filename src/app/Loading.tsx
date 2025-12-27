import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container px-4 py-16 space-y-12">
            {/* Hero Skeleton */}
            <div className="flex flex-col items-center text-center space-y-4 py-12">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-12 w-3/4 max-w-2xl" />
                <Skeleton className="h-4 w-1/2 max-w-lg" />
                <div className="flex gap-4 mt-6">
                    <Skeleton className="h-12 w-32 rounded-full" />
                    <Skeleton className="h-12 w-32 rounded-full" />
                </div>
            </div>

            {/* Featured Posts Skeleton */}
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-video w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest Articles Skeleton */}
            <div className="space-y-8">
                <Skeleton className="h-8 w-48" />
                <div className="grid gap-8 lg:grid-cols-2">
                    {[1, 2, 4, 5].map((i) => (
                        <div key={i} className="flex gap-6 p-4 rounded-3xl border border-slate-100 dark:border-white/5">
                            <Skeleton className="shrink-0 w-48 h-32 rounded-2xl" />
                            <div className="flex-1 space-y-4">
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <div className="flex justify-between items-center mt-4">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}