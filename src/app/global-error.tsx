'use client'

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useEffect } from "react"
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function GlobalError({ error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <html lang="en" className={inter.className}>
            <body>
                <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground space-y-6 p-4 text-center">
                    <div className="rounded-full bg-destructive/10 p-6 mb-4">
                        <AlertTriangle className="h-16 w-16 text-destructive" />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">Something went wrong!</h1>

                    <p className="text-muted-foreground max-w-[500px]">
                        We apologize for the inconvenience. A critical error occurred.
                        You can try refreshing the page or navigating back to safety.
                    </p>

                    <div className="pt-4 flex gap-4">
                        <Button onClick={() => reset()} size="lg" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => window.location.href = '/'}>
                            Go Home
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    )
}