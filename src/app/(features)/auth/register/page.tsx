import { AuthWrapper } from "../_components/AuthWrapper"
import { RegisterForm } from "../_components/RegisterForm"

export default function RegisterPage() {
    return (
        <AuthWrapper
            title="Create an account"
            description="Enter your information to create an account"
            backButtonLabel="Already have an account? Sign in"
            backButtonHref="/auth/login"
        >
            <RegisterForm />
        </AuthWrapper>
    )
}
