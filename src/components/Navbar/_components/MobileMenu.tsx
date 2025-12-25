import Link from "next/link"
import Image from "next/image"
import { Menu, LogIn, UserPlus, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

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
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 flex flex-col p-0">
                <SheetHeader className="px-6 py-6 border-b border-border/40">
                    <SheetTitle className="text-left flex items-center">
                        <Image
                            src="/images/logoSm.png"
                            alt="BlogSpace"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                        <span className="ml-3 text-lg font-bold tracking-tight">BlogSpace</span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        Navigation menu
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <nav className="space-y-1">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all hover:bg-muted/60 hover:text-primary rounded-xl text-muted-foreground"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 mt-auto border-t border-border/40 bg-muted/20">
                    {!session && !isPending && (
                        <div className="flex flex-col gap-2">
                            <Link href="/auth/login" className="w-full">
                                <Button variant="ghost" className="w-full justify-center gap-2 h-9 text-xs font-bold rounded-xl">
                                    <LogIn className="h-3.5 w-3.5" />
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/auth/register" className="w-full">
                                <Button className="w-full justify-center gap-2 h-10 text-xs font-bold rounded-xl shadow-xs">
                                    <UserPlus className="h-3.5 w-3.5" />
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    )}
                    {isPending && (
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-9 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                        </div>
                    )}
                    {session && (
                        <Link href="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 transition-colors">
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-border">
                                <Image
                                    src={session.user.image || "/images/placeholder-user.jpg"}
                                    alt={session.user.name}
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-bold truncate">{session.user.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{session.user.email}</span>
                            </div>
                        </Link>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
