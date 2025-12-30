import { Suspense } from 'react'
import MostViewedSection from './_home/_components/MostViewedSection'
import LatestArticlesSection from './_home/_components/LatestArticlesSection'
import AuthorsSection from './_home/_components/AuthorsSection'
import HeroSection from './_home/_components/HeroSection'
import { AuthorsSkeleton, LatestArticlesSkeleton, MostViewedSkeleton } from './_home/_components/HomeSkeleton'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <main className="flex-1">
        {/* Hero Section - Static content, loads instantly */}
        <HeroSection />

        {/* Most Viewed Section */}
        <Suspense fallback={<MostViewedSkeleton />}>
          <MostViewedSection />
        </Suspense>

        {/* Latest Articles Section */}
        <Suspense fallback={<LatestArticlesSkeleton />}>
          <LatestArticlesSection />
        </Suspense>

        {/* Authors Slider Section */}
        <Suspense fallback={<AuthorsSkeleton />}>
          <AuthorsSection />
        </Suspense>
      </main>
    </div>
  )
}