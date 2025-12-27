import { Button } from '@/components/ui/button'

const SpecificBlogSidebar = () => {
    return (
        <aside className="hidden lg:block lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Table of Contents</h3>
                    <nav className="space-y-2 text-sm">
                        <a href="#author" className="block text-muted-foreground hover:text-primary transition-colors">Introduction</a>
                        <a href="#content" className="block text-muted-foreground hover:text-primary transition-colors">Content</a>
                        <a href="#popTip" className="block text-muted-foreground hover:text-primary transition-colors">popTip</a>
                    </nav>
                </div>

                <div className="rounded-xl bg-muted/50 p-6">
                    <h3 className="font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Subscribe to get the latest updates directly to your inbox.
                    </p>
                    <div className="space-y-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full h-9 rounded-md border px-3 text-sm"
                        />
                        <Button className="w-full" size="sm">Subscribe</Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SpecificBlogSidebar