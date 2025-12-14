"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function AddCategoryPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        if (!name.trim()) {
            setError("Category name is required");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create category");
            }

            if (data.success) {
                setSuccess("Category created successfully!");
                setName("");
                // Optional: Redirect after success
                // router.push("/dashboard/category");
            } else {
                setError(data.message || "Failed to create category");
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/category">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Add New Category</h1>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                        <CardDescription>
                            Create a new category to organize your blog posts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Technology, Lifestyle..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-900">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-900">
                                {success}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Create Category
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}