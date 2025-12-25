"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
    LayoutDashboard,
    PlusCircle,
    FileText,
    BarChart3,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DashboardSidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login")
                }
            }
        })
    }

    const userInitials = session?.user?.name
        ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
        : "US"

    const routes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500",
        },
        {
            label: "My Articles",
            icon: FileText,
            href: "/dashboard/article",
            color: "text-pink-700",
        },
        {
            label: "Analytics",
            icon: BarChart3,
            href: "/dashboard/analytics",
            color: "text-orange-700",
        },
        {
            label: "Add Category",
            icon: PlusCircle,
            href: "/dashboard/category/add-category",
            color: "text-violet-500",
        },
    ]

    return (
        <div
            className={cn(
                "relative flex flex-col h-full bg-slate-900 text-white transition-all duration-300 ease-in-out",
                collapsed ? "w-20" : "w-72",
                className
            )}
        >
            {/* Collapse Toggle Button - Desktop Only */}
            <div className="absolute -right-3 top-10 hidden md:flex z-50">
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-6 w-6 rounded-full shadow-md border hover:bg-slate-200"
                    onClick={toggleCollapse}
                >
                    {collapsed ? <ChevronRight className="h-3 w-3 text-slate-900" /> : <ChevronLeft className="h-3 w-3 text-slate-900" />}
                </Button>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-2">
                <div className={cn("flex items-center mb-8 px-4 transition-all duration-300", collapsed ? "justify-center" : "px-6")}>
                    <Link href="/" className="flex items-center">
                        <div className="relative flex items-center justify-center shrink-0">
                            <div className="relative">
                                <Image
                                    src="/images/logoSm.png"
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    className="object-contain rounded-xl h-auto"
                                />
                            </div>
                        </div>
                        {!collapsed && (
                            <h1 className="ml-4 text-xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent truncate">
                                BlogSpace
                            </h1>
                        )}
                    </Link>
                </div>

                <div className="px-3 space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center w-full rounded-xl transition-all duration-200 group relative",
                                collapsed ? "justify-center p-3" : "px-4 py-3",
                                pathname === route.href
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                            title={collapsed ? route.label : undefined}
                        >
                            <route.icon className={cn("h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110", route.color)} />
                            {!collapsed && (
                                <span className={cn("ml-3 text-sm font-medium transition-opacity duration-300", pathname === route.href && "text-white")}>
                                    {route.label}
                                </span>
                            )}
                            {/* Simple tooltip for collapsed state */}
                            {collapsed && (
                                <div className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
                                    {route.label}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-4 mt-auto">
                {!collapsed && <Separator className="bg-white/10 mb-4" />}
                <div className={cn("flex items-center gap-x-3 rounded-xl p-2 transition-colors hover:bg-white/5", collapsed ? "justify-center" : "")}>
                    <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage className="object-cover" src={session?.user?.image || ""} />
                        <AvatarFallback className="bg-slate-800 text-slate-200">{userInitials}</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-medium truncate text-white">{session?.user?.name || "User"}</p>
                            <p className="text-xs text-zinc-500 truncate">{session?.user?.email || "user@example.com"}</p>
                        </div>
                    )}
                </div>

                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={cn(
                        "w-full mt-2 text-zinc-400 hover:text-white hover:bg-white/5",
                        collapsed ? "justify-center px-0" : "justify-start pl-3"
                    )}
                >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="ml-3">Logout</span>}
                </Button>
            </div>
        </div>
    )
}

export const MobileSidebar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = authClient.useSession()

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login")
                }
            }
        })
    }

    const userInitials = session?.user?.name
        ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
        : "US"

    const routes = [
        { label: "Overview", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
        { label: "Add Article", icon: PlusCircle, href: "/dashboard/article/add-article", color: "text-violet-500" },
        { label: "My Articles", icon: FileText, href: "/dashboard/article", color: "text-pink-700" },
        { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics", color: "text-orange-700" },
    ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-r border-slate-800 text-white w-72 flex flex-col">
                <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <div className="px-6 py-8">
                        <Link href="/dashboard" className="flex items-center mb-10">
                            <div className="relative h-10 w-10 mr-4">
                                <Image
                                    src="/images/logoSm.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain rounded-xl"
                                />
                            </div>
                            <h1 className="text-xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                BlogSpace
                            </h1>
                        </Link>

                        <div className="space-y-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "flex items-center px-4 py-4 rounded-xl transition-all duration-200 group",
                                        pathname === route.href
                                            ? "bg-white/10 text-white shadow-sm"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <route.icon className={cn("h-5 w-5 mr-3 transition-transform group-hover:scale-110", route.color)} />
                                    <span className="font-medium">{route.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto p-6 space-y-4">
                        <Separator className="bg-white/10" />
                        <div className="flex items-center gap-x-3 p-2">
                            <Avatar className="h-10 w-10 border border-white/10">
                                <AvatarImage src={session?.user?.image || ""} />
                                <AvatarFallback className="bg-slate-800 text-slate-200">{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-sm font-medium truncate text-white">{session?.user?.name || "User"}</p>
                                <p className="text-xs text-zinc-500 truncate">{session?.user?.email || "user@example.com"}</p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/5 pl-2"
                        >
                            <LogOut className="h-4 w-4 mr-3" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
