import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import BlogCard from './BlogCard'

const BlogSlider = ({ blogs }: { blogs: any }) => {
    // Use the first 5 posts for the slider
    const featuredPosts = blogs.slice(0, 5);

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-bold tracking-tight">Featured Stories</h2>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {featuredPosts.map((post: any) => (
                        // Adjusted basis for smaller cards: 1.2 on mobile (peek), 2 on tablet, 3 on desktop
                        <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-1 h-full">
                                <BlogCard
                                    id={post.id}
                                    slug={post.slug}
                                    title={post.title}
                                    content={post.content}
                                    image={post.image}
                                    category={post.category}
                                    updatedAt={post.updatedAt}
                                    createdAt={post.createdAt}
                                    user={post.user}
                                    className="h-full text-sm"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious className="-left-4 h-8 w-8" />
                    <CarouselNext className="-right-4 h-8 w-8" />
                </div>
            </Carousel>
        </div>
    )
}

export default BlogSlider