import { Skeleton } from "@/components/ui/skeleton"

export function MostViewedSkeleton() {
    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-10 w-48" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-48 w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function LatestArticlesSkeleton() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-10 w-48" />
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-6 p-4">
                            <Skeleton className="h-48 w-48 rounded-xl shrink-0" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function AuthorsSkeleton() {
    return (
        <section className="py-24 bg-muted/10 border-y">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-64 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </section>
    )
}