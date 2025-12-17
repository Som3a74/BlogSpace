"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { FormFeedback } from "@/components/feedback/form-feedback"

export function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const formDataObject = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataObject),
            })
            const data = await response.json()

            if (response.status === 200) {
                setLoading(false)
                toast.success(data.message)
            } else {
                setError(data.message || "Failed to login");
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            setError(error as string)
        }
    }

    useEffect(() => {
        return () => {
            setError(null)
            setLoading(false)
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    disabled={loading}
                />
            </div>
            <FormFeedback message={error} type="error" />
            <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
        </form>
    )
}
