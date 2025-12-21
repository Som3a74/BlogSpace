export interface BlogCardProps {
    title: string
    image: string
    updatedAt: string
    createdAt: string
    content: any
    user: {
        id: string
        name: string
        avatar?: string
    }
    category: {
        id: string
        name: string
    }
    id: string
    className?: string
}