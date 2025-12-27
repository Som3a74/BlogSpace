import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-slate-50/40 dark:bg-[#050505]">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">

                    {/* Left: Quick Profile Card Skeleton */}
                    <div className="w-full lg:w-80 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="space-y-6 flex flex-col items-center lg:items-start w-full">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2 w-full flex flex-col items-center lg:items-start">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <div className="flex items-center justify-between w-full max-w-50 lg:max-w-none pt-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-6 w-20 rounded-lg" />
                            </div>
                        </div>
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>

                    {/* Right: Main Content Hub Skeleton */}
                    <div className="flex-1 w-full max-w-3xl">
                        <div className="space-y-10">
                            <div className="flex justify-center lg:justify-start">
                                <Skeleton className="h-12 w-full max-w-md rounded-full" />
                            </div>
                            <div className="space-y-6">
                                <Skeleton className="h-100 w-full rounded-[2.5rem]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
