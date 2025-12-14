import { AuthWrapper } from "../_components/AuthWrapper"
import { LoginForm } from "../_components/LoginForm"

export default function LoginPage() {
    return (
        <AuthWrapper
            title="Welcome back"
            description="Enter your email to sign in to your account"
            backButtonLabel="Don't have an account? Sign up"
            backButtonHref="/auth/register"
        >
            <LoginForm />
        </AuthWrapper>
    )
}
