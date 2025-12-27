"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface SaveButtonProps {
    articleId: number;
    initialSaved?: boolean;
}

export default function SaveButton({ articleId, initialSaved = false }: SaveButtonProps) {
    const [saved, setSaved] = useState(initialSaved);
    const [loading, setLoading] = useState(false);

    const handleToggleSave = async () => {
        setLoading(true);
        // Optimistic update
        setSaved(!saved);

        try {
            const response = await fetch("/api/article/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ articleId }),
            });

            if (!response.ok) {
                // Revert on error
                setSaved(saved);
                toast.error("Authentication required to save articles");
            } else {
                const result = await response.json();
                const isSaved = result.data?.saved ?? result.saved;
                setSaved(isSaved);
                toast.success(isSaved ? "Article bookmarked" : "Bookmark removed");
            }
        } catch (error) {
            setSaved(saved);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant={saved ? "default" : "outline"}
            size="icon"
            className={cn("rounded-full transition-all active:scale-95", saved && "bg-primary text-white shadow-md shadow-primary/20")}
            onClick={handleToggleSave}
            disabled={loading}
        >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
        </Button>
    )
}
