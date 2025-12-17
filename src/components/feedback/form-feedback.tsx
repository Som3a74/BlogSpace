import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFeedbackProps {
    message?: string | null;
    type?: "success" | "error" | "warning";
    className?: string;
}

export const FormFeedback = ({ message, type = "error", className }: FormFeedbackProps) => {
    if (!message) return null;

    const styles = {
        success: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
        error: "bg-destructive/15 text-destructive border-destructive/20 dark:bg-destructive/10 dark:text-red-400 dark:border-red-900/30",
        warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
    };

    const icons = {
        success: <CheckCircle className="h-4 w-4" />,
        error: <AlertCircle className="h-4 w-4" />,
        warning: <AlertTriangle className="h-4 w-4" />,
    };

    return (
        <div
            className={cn(
                "flex items-center gap-x-2 rounded-md border p-3 text-sm shadow-sm transition-all animate-in fade-in-50 slide-in-from-top-1",
                styles[type],
                className
            )}
        >
            {icons[type]}
            <p>{message}</p>
        </div>
    );
};
