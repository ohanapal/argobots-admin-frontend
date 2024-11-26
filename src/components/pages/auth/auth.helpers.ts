'use client'

import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { setCookie } from 'cookies-next'

export const loginActions = (user, push, rememberMe) => {
  const { refreshToken, accessToken, ...userData } = user || {}

  if (refreshToken && accessToken) {
    if (rememberMe) {
      setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
      setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })
      setCookie('userData', JSON.stringify(userData), {
        maxAge: calculateTokenExpiration(refreshToken)
      })
    } else {
      setCookie('refreshToken', refreshToken)
      setCookie('accessToken', accessToken)
      setCookie('userData', JSON.stringify(userData))
    }
  }

  const userRole = user?.type

  if (['super-admin', 'admin'].includes(userRole)) {
    push('/admin/dashboard')
  } else if (['company-admin', 'user'].includes(userRole)) {
    push('/company/dashboard')
  } else if (userRole === 'reseller') {
    push('/reseller/dashboard')
  }
}
