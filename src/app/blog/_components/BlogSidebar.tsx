import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SearchInput from "./SearchInput"
import CategoryFilter from "./CategoryFilter"
import StateFilter from "./StateFilter"

import ResetFilter from "./ResetFilter"

import { getCategories } from '@/lib/data/categories'

const BlogSidebar = async () => {

    const categories = await getCategories()

    return (
        <aside className="lg:col-span-1 space-y-6">
            {/* Search */}
            <SearchInput placeholder="Search articles..." />

            <ResetFilter />

            {/* Filters */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sticky top-24">
                <div className="flex items-center gap-2 font-semibold mb-4">
                    <Filter className="h-4 w-4" /> Filters
                </div>
                <Accordion type="single" collapsible className="w-full" defaultValue="categories">
                    <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                            <CategoryFilter categories={categories.data || []} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="state">
                        <AccordionTrigger>States</AccordionTrigger>
                        <AccordionContent>
                            <StateFilter />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </aside>
    )
}

export default BlogSidebar