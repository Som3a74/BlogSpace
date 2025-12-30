"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

interface Category {
    id: number;
    name: string;
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    // Convert 'category' param to a Set of numbers for easier checking
    const currentCategory = searchParams.get('category');

    const handleFilter = (categoryId: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1') // Reset page on filter change

        // Toggle logic: if already selected, remove it.
        if (currentCategory === categoryId.toString()) {
            params.delete('category')
        } else {
            params.set('category', categoryId.toString())
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-col gap-2">
            {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                    <input
                        type="checkbox"
                        checked={currentCategory === cat.id.toString()}
                        onChange={() => handleFilter(cat.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    {cat.name}
                </label>
            ))}
        </div>
    )
}
