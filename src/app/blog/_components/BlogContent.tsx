import { cn } from "@/lib/utils"

interface BlogContentProps {
    content: any // Free-form JSON content
    proTip?: string
    className?: string
}

const BlogContent = ({ className, content, proTip }: BlogContentProps) => {
    return (
        <article className={cn("prose prose-slate dark:prose-invert max-w-none lg:prose-lg", className)}>
            <p>
                {content}
            </p>
            {proTip && (
                <div className="my-8 rounded-lg overflow-hidden border bg-muted/50 p-6" id="popTip">
                    <h4 className="text-lg font-semibold mb-2">Pro Tip</h4>
                    <p className="m-0 text-sm text-muted-foreground">
                        {proTip}
                    </p>
                </div>
            )}
        </article>
    )
}

export default BlogContent