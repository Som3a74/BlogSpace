'use client'
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground space-y-6 p-4 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
                <FileQuestion className="h-16 w-16 text-muted-foreground" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">404</h1>
            <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>

            <p className="text-muted-foreground max-w-[500px] text-lg">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>

            <div className="pt-6">
                <Button onClick={() => window.location.href = "/"} size="lg" className="gap-2 cursor-pointer">
                    <Home className="h-4 w-4" />
                    Return Home
                </Button>
            </div>
        </div>
    )
}


// 'use client'

// import './globals.css'
// import { Inter } from 'next/font/google'
// import type { Metadata } from 'next'
// import { Button } from "@/components/ui/button"
// import { FileQuestion, Home } from "lucide-react"

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//     title: '404 - Page Not Found',
//     description: 'The page you are looking for does not exist.',
// }

// export default function GlobalNotFound() {
//     return (
//         <html lang="en" className={inter.className}>
//             <body>
//                 <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground space-y-6 p-4 text-center">
//                     <div className="rounded-full bg-muted p-6 mb-4">
//                         <FileQuestion className="h-16 w-16 text-muted-foreground" />
//                     </div>

//                     <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">404</h1>
//                     <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>

//                     <p className="text-muted-foreground max-w-[500px] text-lg">
//                         Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
//                     </p>

//                     <div className="pt-6">
//                         <Button onClick={() => window.location.href = "/"} size="lg" className="gap-2 cursor-pointer">
//                             <Home className="h-4 w-4" />
//                             Return Home
//                         </Button>
//                     </div>
//                 </div>
//             </body>
//         </html>
//     )
// }
