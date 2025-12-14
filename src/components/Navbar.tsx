import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative">
                            <Image
                                src="/images/logo.png"
                                alt="BlogSpace Logo"
                                width={130}
                                height={120}
                                className="object-contain h-auto"
                                priority
                            />
                        </div>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary text-muted-foreground">
                        About
                    </Link>
                    <Link href="/blog" className="transition-colors hover:text-primary text-muted-foreground">
                        Blog
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-primary text-muted-foreground">
                        Contact
                    </Link>
                    <Link href="/dashboard" className="transition-colors hover:text-primary text-muted-foreground">
                        Dashboard
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/auth/login" className="transition-colors hover:text-primary text-muted-foreground">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/auth/register" className="transition-colors hover:text-primary text-muted-foreground">
                        <Button size="sm">Sign up</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
