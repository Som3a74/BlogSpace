"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RotateCcw } from "lucide-react"

export default function ResetFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasFilters = searchParams.toString().length > 0;

    const handleReset = () => {
        router.replace(pathname, { scroll: false })
    }

    if (!hasFilters) return null;

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-full gap-2"
        >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
        </Button>
    )
}
