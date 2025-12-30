"use client"

import { Search } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SearchInput({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    // Local state for immediate input feedback
    const [term, setTerm] = useState(searchParams.get('q')?.toString() || '')

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            params.set('page', '1')
            if (term) {
                params.set('q', term)
            } else {
                params.delete('q')
            }
            // Avoid pushing if nothing changed (optional but good)
            if (params.get('q') !== searchParams.get('q')) {
                replace(`${pathname}?${params.toString()}`, { scroll: false })
            }
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [term, searchParams, pathname, replace])

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                placeholder={placeholder}
                className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
        </div>
    )
}
