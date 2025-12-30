"use client"

import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { PenTool, ChevronRight, Users } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

interface Author {
    id: string
    name: string
    image: string | null
    bio: string
    _count: {
        articles: number
    }
}

export default function AuthorsSlider({ authors }: { authors: Author[] }) {
    if (!authors || authors.length === 0) return null

    return (
        <section className="py-24 bg-muted/10 border-y relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />

            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 text-primary bg-primary/5">
                        <Users className="w-3.5 h-3.5 mr-2" />
                        Community
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Meet Our <span className="text-primary">Authors</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        The talented voices behind our insightful articles. Explore their profiles and discover their unique perspectives.
                    </p>
                </div>

                <div className="mx-auto max-w-7xl relative px-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {authors.map((author) => (
                                <CarouselItem key={author.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <Link href={`/author/${author.id}`} className="group h-full block">
                                        <Card className="h-full border border-muted bg-background hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <CardContent className="flex flex-col items-center p-6">
                                                <div className="relative mb-4">
                                                    <Avatar className="w-20 h-20 border-4 border-muted group-hover:border-primary/20 transition-all duration-300 shadow-sm">
                                                        <AvatarImage src={author.image || ""} alt={author.name} className="object-cover" />
                                                        <AvatarFallback className="text-2xl font-bold text-primary bg-primary/10">
                                                            {author.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background hover:bg-background text-foreground border shadow-sm text-[10px] px-1.5 py-0 pointer-events-none">
                                                        Author
                                                    </Badge>
                                                </div>

                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 text-center">
                                                    {author.name}
                                                </h3>

                                                <p className="text-sm text-muted-foreground text-center line-clamp-2 mb-6 min-h-12">
                                                    {author.bio || "Sharing insights and stories on technology."}
                                                </p>

                                                <div className="w-full pt-4 border-t border-muted/50 flex items-center justify-between text-sm">
                                                    <div className="flex items-center text-muted-foreground">
                                                        <PenTool className="w-3.5 h-3.5 mr-2 text-primary" />
                                                        <span className="font-medium">{author._count.articles}</span>
                                                        <span className="ml-1">Articles</span>
                                                    </div>
                                                    <span className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden lg:block">
                            <CarouselPrevious className="-left-12 h-10 w-10 border-muted hover:border-primary hover:text-primary" />
                            <CarouselNext className="-right-12 h-10 w-10 border-muted hover:border-primary hover:text-primary" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
