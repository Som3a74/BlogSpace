import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-4">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Post Not Found</h2>
                <p className="text-muted-foreground">
                    Sorry, we couldn't find the blog post you're looking for.
                </p>
            </div>
            <div className="flex gap-2 min-[400px]:flex-row">
                <Button asChild variant="default">
                    <Link href="/blog">Return to Blog</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    )
}