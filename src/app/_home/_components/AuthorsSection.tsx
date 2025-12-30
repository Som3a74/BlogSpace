
import { getAuthors } from '@/lib/data/users'
import AuthorsSlider from './AuthorsSlider'

export default async function AuthorsSection() {
    const authorsResponse = await getAuthors();
    const authors = authorsResponse.data || [];

    return <AuthorsSlider authors={authors} />
}
