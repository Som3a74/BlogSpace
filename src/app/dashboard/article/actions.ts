'use server'

import { deleteArticle } from "@/lib/data/articles"
import { revalidatePath } from "next/cache"

export async function deleteArticleAction(id: number) {
    const result = await deleteArticle(id)
    if (result.success) {
        revalidatePath('/dashboard/article')
    }
    return result
}
