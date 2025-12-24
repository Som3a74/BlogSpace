import Link from "next/link"
import Image from "next/image"
import { Menu, LogIn, UserPlus, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

interface NavItem {
    href: string
    label: string
    icon: LucideIcon
}

interface MobileMenuProps {
    items: NavItem[]
    session: any
    isPending: boolean
}

export function MobileMenu({ items, session, isPending }: MobileMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2">
                        <Image
                            src="/images/logo.png"
                            alt="BlogSpace Logo"
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                        <span className="sr-only">Navigation Menu</span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        Navigation menu for mobile devices
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                    <nav className="flex flex-col gap-2">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-4 px-2 py-3 text-lg font-medium transition-colors hover:bg-muted hover:text-foreground rounded-md text-muted-foreground"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    {!session && !isPending && (
                        <div className="border-t pt-6 flex flex-col gap-3">
                            <Link href="/auth/login">
                                <Button variant="outline" className="w-full justify-start gap-2 h-11 text-base">
                                    <LogIn className="h-5 w-5" />
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="w-full justify-start gap-2 h-11 text-base">
                                    <UserPlus className="h-5 w-5" />
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    )}
                    {isPending && (
                        <div className="border-t pt-6 flex flex-col gap-3">
                            <Skeleton className="h-11 w-full" />
                            <Skeleton className="h-11 w-full" />
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
