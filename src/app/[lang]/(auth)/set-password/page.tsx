export const dynamic = 'force-dynamic'

import AuthPageWrapper from '@/components/common/auth/AuthPageWrapper'
import SetPassword from './SetPassword'

export default function SetPasswordPage() {
  return (
    <AuthPageWrapper formPosition='left'>
      <SetPassword />
    </AuthPageWrapper>
  )
}
