import React from "react";
import { DashboardSidebar, MobileSidebar } from "./_components/DashboardSidebar";
// import { UserButton } from "@/components/auth/user-button"; // Commented out as not installed
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Desktop Sidebar - Hidden on mobile, flex item on desktop */}
            <div className="hidden md:block border-r border-slate-200 dark:border-slate-800 bg-slate-900 text-white h-full shrink-0">
                <DashboardSidebar />
            </div>

            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Navbar / Header for Dashboard */}
                <div className="flex items-center p-4 border-b h-16 bg-white dark:bg-slate-950 shadow-sm gap-4 shrink-0 z-10 transition-all duration-300">
                    <MobileSidebar />
                    <div className="flex-1">
                        {/* Search or simplified breadcrumbs could go here */}
                    </div>
                    <div className="flex items-center gap-x-3">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-600 rounded-full" />
                        </Button>
                        {/* <UserButton /> */}
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}