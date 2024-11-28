import AuthPageWrapper from '@/components/common/auth/AuthPageWrapper'
import LoginForm from '@/components/pages/auth/login/LoginForm'

export const metadata = {
  title: 'Login | Argobots',
  description: 'Login page'
}

export default function LoginPage() {
  return (
    <AuthPageWrapper>
      <LoginForm />
    </AuthPageWrapper>
  )
}
