export interface TArticle {
    title: string;
    slug: string;
    content: any;
    proTip: string | null;
    published: boolean;
    image: string | null;
    categoryId: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    views: number;
}
