import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-50 w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}
