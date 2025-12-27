"use client"
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

const SharedButton = ({ title = "" }: { title: string }) => {

    const handleShare = () => {
        try {
            navigator.share({
                title: title,
                url: window.location.href
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
        </Button>
    )
}

export default SharedButton