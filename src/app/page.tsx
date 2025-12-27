import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User, Eye } from "lucide-react"
import { getArticles } from '@/lib/data/articles'
import { dataFormat } from '@/utils/dataFormat'
import Link from 'next/link'

export default async function Home() {
  const articlesResponse = await getArticles();
  const articles = (articlesResponse.success && Array.isArray(articlesResponse.data)) ? articlesResponse.data : [];

  const featuredArticles = articles.slice(0, 3);
  const latestArticles = articles.length > 3 ? articles.slice(3, 7) : articles.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]  from-primary/20 via-background to-background"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm animate-in fade-in duration-500">
                Welcome to our blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
                Explore the Future of <span className="text-primary">Technology</span> & <span className="text-primary">Design</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-175 animate-in fade-in duration-700 delay-200">
                Discover insightful articles, tutorials, and stories from industry experts.
                Stay ahead of the curve with our weekly updates.
              </p>
              <div className="flex gap-4 mt-6 animate-in fade-in duration-700 delay-300">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href="/blog">Start Reading</Link>
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
              <Button variant="ghost" className="gap-2" asChild>
                <Link href="/blog">View all <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article: any) => (
                <Card key={article.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="aspect-video w-full bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={article.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 z-20">{article.category?.name || "Uncategorized"}</Badge>
                  </div>
                  <CardHeader>
                    <Link href={`/blog/${article.slug}`}>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                        {article.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3" /> {dataFormat(article.createdAt)}
                      <span className="text-muted-foreground/50">•</span>
                      <Clock className="h-3 w-3" /> 5 min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {typeof article.content === 'string'
                        ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."
                        : "No content available."}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                        {(article.user?.name || "A").charAt(0)}
                      </div>
                      {article.user?.name || "Anonymous"}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        {latestArticles.length > 0 && (
          <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Fresh Content</Badge>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Latest <span className="text-primary">Articles</span></h2>
                </div>
                <Button variant="ghost" className="group text-primary font-bold uppercase tracking-widest text-xs" asChild>
                  <Link href="/blog">
                    Explore All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {latestArticles.map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="group relative flex flex-col sm:flex-row gap-6 p-4 rounded-3xl border border-slate-100 dark:border-white/5 bg-white/50 dark:bg-white/2 backdrop-blur-sm hover:bg-white dark:hover:bg-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                  >
                    <div className="shrink-0 w-full sm:w-48 h-48 sm:h-auto rounded-2xl overflow-hidden relative">
                      <img
                        src={article.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="flex flex-col justify-between py-2 flex-1">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 py-0.5">
                            {article.category?.name || "Uncategorized"}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 5 min read
                          </span>
                        </div>
                        <h3 className="font-black text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase italic tracking-tight">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {typeof article.content === 'string'
                            ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."
                            : "No content available."}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                            {(article.user?.name || "A").charAt(0)}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {article.user?.name || "Anonymous"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {dataFormat(article.createdAt)}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {article.views || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Button size="lg" className="rounded-full px-12 font-black uppercase tracking-widest text-[11px] h-12 shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
                  <Link href="/blog">Load More Articles</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter / Stay in loop */}
        <section className="py-20 bg-primary/5">
          <div className="container px-4 md:px-6 text-center animate-in fade-in duration-1000">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Stay in the loop</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Join our newsletter to get the latest articles, resources, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-full border border-input bg-background px-6 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="rounded-full px-8">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}