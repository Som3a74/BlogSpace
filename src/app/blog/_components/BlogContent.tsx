import { cn } from "@/lib/utils"

interface BlogContentProps {
    content: {
        Introduction: string,
        ProTip: string,
        Conclusion: string
    }
    className?: string
}

const BlogContent = ({ className, content }: BlogContentProps) => {
    return (
        <article className={cn("prose prose-slate dark:prose-invert max-w-none lg:prose-lg", className)}>
            <h2>Introduction</h2>
            <p>
                {content.Introduction}
            </p>

            <div className="my-8 rounded-lg overflow-hidden border bg-muted/50 p-6" id="popTip">
                <h4 className="text-lg font-semibold mb-2">Pro Tip</h4>
                <p className="m-0 text-sm text-muted-foreground">
                    {content.ProTip}
                </p>
            </div>

            <h2>Conclusion</h2>
            <p>
                {content.Conclusion}
            </p>
        </article>
    )
}

export default BlogContent