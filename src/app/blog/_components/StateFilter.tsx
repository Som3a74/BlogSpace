"use client"

import { Badge } from "@/components/ui/badge"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

interface StateOption {
    title: string;
    id: string; // 'latest' | 'most-viewed'
    param: string; // value for ?sort=...
}

const options: StateOption[] = [
    { title: "Latest Article", id: "latest", param: "latest" },
    { title: "Most Viewed", id: "most-viewed", param: "most-viewed" },
]

export default function StateFilter() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const currentSort = searchParams.get('sort') || 'latest';

    const handleSort = (sortValue: string) => {
        const params = new URLSearchParams(searchParams)
        // If sorting changes, we usually keep other filters but maybe reset page?
        // Resetting page is good practice.
        params.set('page', '1')

        if (sortValue === 'latest') {
            params.delete('sort'); // Default
        } else {
            params.set('sort', sortValue);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
                const isActive = (opt.param === 'latest' && !searchParams.get('sort')) || currentSort === opt.param;
                return (
                    <Badge
                        key={opt.id}
                        variant={isActive ? "default" : "secondary"}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => handleSort(opt.param)}
                    >
                        {opt.title}
                    </Badge>
                )
            })}
        </div>
    )
}
