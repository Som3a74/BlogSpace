export interface TArticle {
    title: string;
    slug: string;
    content: any; // Free-form JSON content
    proTip?: string;
    published: boolean;
    image: string;
    categoryId: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
