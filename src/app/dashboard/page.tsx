import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Eye, MessageCircle, Users } from 'lucide-react'

const DashboardPage = () => {
    // Mock data - in a real app these would come from your database
    const stats = [
        {
            title: "Total Articles",
            value: "12",
            icon: FileText,
            description: "+2 from last month",
            color: "text-blue-500"
        },
        {
            title: "Total Views",
            value: "1,234",
            icon: Eye,
            description: "+15% from last month",
            color: "text-emerald-500"
        },
        {
            title: "Comments",
            value: "48",
            icon: MessageCircle,
            description: "+5 since last week",
            color: "text-amber-500"
        },
        {
            title: "Active Authors",
            value: "3",
            icon: Users,
            description: "No change",
            color: "text-violet-500"
        }
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your blog performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            No recent activity to show.
                        </p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Popular Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Technology</p>
                                    <p className="text-xs text-muted-foreground">5 articles</p>
                                </div>
                                <div className="ml-auto font-medium">+15%</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Lifestyle</p>
                                    <p className="text-xs text-muted-foreground">3 articles</p>
                                </div>
                                <div className="ml-auto font-medium">+5%</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage