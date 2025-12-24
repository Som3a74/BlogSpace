"use client"

import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UploadButton } from "@/utils/uploadthing"
import { toast } from "sonner"

interface ImageUploadInputProps {
    value: string | null
    onChange: (url: string | null) => void
}

export function ImageUploadInput({ value, onChange }: ImageUploadInputProps) {
    if (value) {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-slate-50 dark:bg-slate-900/20 group shadow-sm">
                <Image
                    src={value}
                    alt="Cover Image Preview"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="font-bold shadow-lg scale-90 group-hover:scale-100 transition-transform"
                        onClick={() => onChange(null)}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Remove Cover Image
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 p-10 text-center transition-all hover:border-primary/50 hover:bg-primary/5 group">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="h-7 w-7 text-primary/60" />
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-1">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        onChange(res[0].ufsUrl)
                        toast.success("Image uploaded successfully")
                    }}
                    onUploadError={(error: Error) => {
                        toast.error(`Upload failed: ${error.message}`)
                    }}
                    appearance={{
                        button: "bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 py-2 rounded-md transition-all text-sm font-medium shadow-sm active:scale-95",
                        allowedContent: "text-[10px] text-muted-foreground uppercase tracking-widest mt-2"
                    }}
                />
            </div>
            <p className="mt-4 text-xs text-muted-foreground font-medium">
                High resolution images recommended (16:9)
            </p>
        </div>
    )
}
