import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]  from-primary/20 via-background to-background"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Welcome to our blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                Explore the Future of <span className="text-primary">Technology</span> & <span className="text-primary">Design</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[700px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Discover insightful articles, tutorials, and stories from industry experts.
                Stay ahead of the curve with our weekly updates.
              </p>
              <div className="flex gap-4 mt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <Button size="lg" className="rounded-full px-8">
                  Start Reading
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Featured Posts</h2>
              <Button variant="ghost" className="gap-2">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video w-full bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1498050108023-c5249f4df085' : i === 2 ? '1550745165-9bc0b252726f' : '1550751827-4bd374c3f58b'}?auto=format&fit=crop&w=800&q=80`}
                      alt="Blog cover"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 z-20">Technology</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      The Future of Web Development in 2025
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3" /> Jan 12, 2025
                      <span className="text-muted-foreground/50">•</span>
                      <Clock className="h-3 w-3" /> 5 min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      Explore the latest trends and technologies shaping the future of the web.
                      From AI-driven interfaces to WebAssembly, find out what's next.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                        <User className="h-3 w-3" />
                      </div>
                      John Doe
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Latest Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 w-32 h-24 md:w-48 md:h-32 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1519389950473-47ba0277781c' : i === 2 ? '1461749280684-dccba630e2f6' : '1531297461368-08ad860aab35'}?auto=format&fit=crop&w=400&q=80`}
                      alt="Article thumbnail"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Badge variant="outline" className="text-[10px] h-5">Design</Badge>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                      Mastering UI/UX Principles for Better Conversion
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 hidden md:block">
                      Learn how to apply psychological triggers and design patterns to improve your user engagement and sales.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-primary/5">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Stay in the loop</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Join our newsletter to get the latest articles, resources, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}