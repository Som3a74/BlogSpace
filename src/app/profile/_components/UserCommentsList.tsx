import Link from "next/link";
import { MessageSquare, Calendar, ChevronRight } from "lucide-react";
import { dataFormat } from "@/utils/dataFormat";

export function UserCommentsList({ comments }: { comments: any[] }) {
    if (comments.length === 0) {
        return (
            <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 dark:bg-white/2 rounded-3xl flex items-center justify-center mx-auto border border-slate-100 dark:border-white/5">
                    <MessageSquare className="h-10 w-10 text-slate-300" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">No comments yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                        Share your insights on articles to see them here.
                    </p>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline">
                    Explore Articles <ChevronRight className="h-4 w-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {comments.map((comment) => (
                <Link
                    key={comment.id}
                    href={`/blog/${comment.article.slug}`}
                    className="group bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-2xl p-6 transition-all hover:ring-2 hover:ring-primary/20"
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                On: {comment.article.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {dataFormat(comment.createdAt)}
                            </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed line-clamp-2 italic">
                            "{comment.content}"
                        </p>
                        <div className="flex justify-end">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                View Discussion <ChevronRight className="h-3 w-3" />
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
