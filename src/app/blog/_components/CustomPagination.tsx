"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function CustomPagination({ totalPages }: { totalPages: number }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    // const { replace } = useRouter() // Using Link is often better for pagination SEO unless purely dynamic.
    // Shadcn PaginationLink usually renders a standard <a> tag or Link if href is provided.

    // Helper to generate URL
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const currentPage = Number(searchParams.get('page')) || 1

    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show pages if total is small (<= 5)
                    // OR if page is first, last, or close to current
                    if (
                        totalPages <= 5 ||
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink href={createPageURL(page)} isActive={page === currentPage}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }

                    // Show ellipsis
                    if (
                        (page === currentPage - 2 && page > 2) || // Left ellipsis
                        (page === currentPage + 2 && page < totalPages - 1) // Right ellipsis
                    ) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    return null;
                })}

                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
