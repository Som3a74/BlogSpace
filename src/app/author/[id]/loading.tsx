import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import ArticleGridSkeleton from "@/app/blog/_components/ArticleGridSkeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Profile Section Skeleton */}
            <div className="bg-muted/30 border-b">
                <div className="container py-16 md:py-24 px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        {/* Avatar Skeleton */}
                        <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-xl" />

                        <div className="space-y-4 flex-1 w-full md:max-w-xl">
                            <div className="space-y-3 flex flex-col items-center md:items-start">
                                {/* Name Skeleton */}
                                <Skeleton className="h-10 w-3/4 md:w-1/2" />
                                {/* Bio Skeleton */}
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-2/3" />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                {/* Stats Skeletons */}
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Articles Grid Skeleton */}
            <div className="container py-16 px-4 md:px-6">
                <div className="flex items-center gap-4 mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Separator className="flex-1" />
                </div>

                <ArticleGridSkeleton />
            </div>
        </div>
    )
}
