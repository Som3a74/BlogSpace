"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, MoreVertical, Pencil, Send, Sparkles, Trash } from "lucide-react"
import { toast } from "sonner"
import { dataFormat } from "@/utils/dataFormat"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    userId: string;
    user: {
        name: string;
        image: string | null;
    }
}

interface CommentsSectionProps {
    articleId: number;
    initialComments: any[];
    sessionUser: any;
}

export default function CommentsSection({ articleId, initialComments, sessionUser }: CommentsSectionProps) {
    const [comments, setComments] = useState<any[]>(initialComments);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !sessionUser) {
            if (!sessionUser) toast.error("Please login to comment");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/article/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ articleId, content }),
            });

            if (response.ok) {
                const result = await response.json();
                const newComment = result.data || result; // Handle both direct and ServiceResponse
                setComments([newComment, ...comments]);
                setContent("");
                toast.success("Comment posted!");
            } else {
                toast.error("Failed to post comment");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async (id: number) => {
        if (!editContent.trim()) return;
        setIsUpdating(true);
        try {
            const response = await fetch("/api/article/comment", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, content: editContent }),
            });

            if (response.ok) {
                const result = await response.json();
                const updatedComment = result.data || result; // Handle both direct and ServiceResponse
                setComments(comments.map(c => c.id === id ? updatedComment : c));
                setEditingId(null);
                toast.success("Comment updated!");
            } else {
                toast.error("Failed to update comment");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch("/api/article/comment", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setComments(comments.filter(c => c.id !== id));
                setDeletingId(null);
                toast.success("Comment deleted!");
            } else {
                toast.error("Failed to delete comment");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 border-b pb-6">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        Discussion ({comments.length})
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">Share your insights with the community</p>
                </div>
            </div>

            {/* Comment Input */}
            {sessionUser ? (
                <form onSubmit={handleSubmit} className="space-y-4 group bg-slate-50/50 dark:bg-white/2 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 transition-all focus-within:ring-2 focus-within:ring-primary/20">
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-900 shadow-sm">
                            <AvatarImage src={sessionUser.image || ""} />
                            <AvatarFallback>{sessionUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Textarea
                            placeholder="Join the conversation..."
                            className="min-h-25 bg-transparent border-none focus-visible:ring-0 text-base font-medium resize-none placeholder:text-slate-400"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !content.trim()}
                            className="bg-primary text-white px-8 rounded-full font-black uppercase tracking-widest text-[11px] h-10 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                        >
                            {isSubmitting ? "Posting..." : (
                                <>Publish Comment <Send className="ml-2 h-3 w-3" /></>
                            )}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="p-8 text-center bg-slate-50 dark:bg-white/2 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10">
                    <p className="text-slate-500 font-medium mb-4">You must be logged in to participate in the discussion.</p>
                    <Button variant="outline" className="rounded-full px-8 font-black uppercase tracking-widest text-[11px]" asChild>
                        <a href="/auth/login">Login to comment</a>
                    </Button>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-8">
                {comments.length === 0 ? (
                    <div className="py-12 text-center space-y-3">
                        <div className="inline-flex h-12 w-12 bg-slate-100 dark:bg-white/5 rounded-full items-center justify-center">
                            <Sparkles className="h-6 w-6 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-medium italic">Be the first to start the conversation!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-5 group">
                            <Avatar className="h-10 w-10 shrink-0 border border-slate-100 dark:border-white/5">
                                <AvatarImage src={comment.user.image || ""} />
                                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{comment.user.name}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {dataFormat(comment.createdAt)}
                                        </span>
                                    </div>

                                    {sessionUser?.id === comment.userId && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => {
                                                    setEditingId(comment.id);
                                                    setEditContent(comment.content);
                                                }}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setDeletingId(comment.id)} className="text-red-600 focus:text-red-600">
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>

                                {editingId === comment.id ? (
                                    <div className="space-y-3 bg-white dark:bg-[#0a0a0a] border border-primary/20 p-5 rounded-2xl rounded-tl-none shadow-lg">
                                        <Textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="min-h-25 bg-transparent border-slate-200 dark:border-white/10"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" onClick={() => setEditingId(null)} className="rounded-full">
                                                Cancel
                                            </Button>
                                            <Button size="sm" onClick={() => handleEdit(comment.id)} disabled={isUpdating} className="rounded-full">
                                                {isUpdating ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : deletingId === comment.id ? (
                                    <div className="space-y-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 p-5 rounded-2xl rounded-tl-none animate-in zoom-in-95 duration-200">
                                        <p className="text-sm font-bold text-rose-800 dark:text-rose-300">
                                            Are you sure you want to delete this comment?
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(comment.id)}
                                                className="rounded-full h-8 px-4 text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Confirm Delete
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setDeletingId(null)}
                                                className="rounded-full h-8 px-4 text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Keep it
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-[#0a0a0a] border border-slate-100 dark:border-white/5 p-5 rounded-2xl rounded-tl-none shadow-sm group-hover:shadow-md transition-all">
                                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                            {comment.content}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
