import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface NavItem {
    href: string
    label: string
    icon: LucideIcon
}

interface NavItemsProps {
    items: NavItem[]
}

export function NavItems({ items }: NavItemsProps) {
    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-primary text-muted-foreground"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}
