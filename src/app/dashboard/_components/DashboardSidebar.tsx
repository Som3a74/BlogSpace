"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    LayoutDashboard,
    PlusCircle,
    FileText,
    BarChart3,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Settings
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DashboardSidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const routes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500",
        },
        {
            label: "Add Article",
            icon: PlusCircle,
            href: "/dashboard/article/add-article",
            color: "text-violet-500",
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
                collapsed ? "w-[80px]" : "w-72",
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
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-medium truncate text-white">User Name</p>
                            <p className="text-xs text-zinc-500 truncate">admin@example.com</p>
                        </div>
                    )}
                </div>

                <Button
                    variant="ghost"
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
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-r border-slate-800 text-white w-72">
                {/* Mobile sidebar is always full width within the sheet */}
                <div className="flex flex-col h-full bg-slate-900 text-white">
                    {/* Reuse the logic but keep it static for mobile */}
                    <div className="px-6 py-6">
                        <Link href="/dashboard" className="flex items-center mb-8">
                            <div className="relative h-9 w-9 mr-4">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain rounded-xl"
                                />
                            </div>
                            <h1 className="text-xl font-bold text-white">
                                BlogSpace
                            </h1>
                        </Link>
                        {/* Hardcoded routes for mobile to avoid complexity with collapsed state props */}
                        <div className="space-y-1">
                            {[
                                { label: "Overview", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
                                { label: "Add Article", icon: PlusCircle, href: "/dashboard/article/add-article", color: "text-violet-500" },
                                { label: "My Articles", icon: FileText, href: "/dashboard/article", color: "text-pink-700" },
                                { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics", color: "text-orange-700" },
                            ].map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className="flex items-center px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition font-medium"
                                >
                                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}