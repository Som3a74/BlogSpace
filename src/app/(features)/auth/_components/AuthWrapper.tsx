"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface AuthWrapperProps {
    children: React.ReactNode
    title: string
    description: string
    showSocial?: boolean
    backButtonLabel: string
    backButtonHref: string
}

export function AuthWrapper({ children, title, description, showSocial = true, backButtonLabel, backButtonHref }: AuthWrapperProps) {
    return (
        <div className="bg-white dark:bg-slate-900 px-8 py-10 shadow-xl rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center mb-8">
                <Link href="/" className="mb-4">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="object-contain h-auto"
                        priority
                    />
                </Link>
                <h2 className="text-2xl font-bold tracking-tight text-center">{title}</h2>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                    {description}
                </p>
            </div>

            {children}

            {showSocial && (
                <>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button" disabled>
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" type="button" disabled>
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                    </div>
                </>
            )}

            <div className="mt-8 text-center text-sm">
                <Link href={backButtonHref} className="font-medium text-primary hover:text-primary/80 transition-colors">
                    {backButtonLabel}
                </Link>
            </div>
        </div>
    )
}
