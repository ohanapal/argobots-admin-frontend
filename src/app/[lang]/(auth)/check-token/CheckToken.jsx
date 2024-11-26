'use client'

import { loginActions } from '@/components/pages/auth/auth.helpers'
import Typography from '@/components/ui/typography'
import { API_URL, LANDING_URL } from '@/configs'
import usePush from '@/hooks/usePush'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function CheckToken() {
  const push = usePush()
  const [isLoading, setisLoading] = useState(true)
  const params = useSearchParams()

  const rememberMe = params.get('rememberMe') === 'true'

  const checkTokenFn = useCallback(async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { type: 'refresh', refreshToken: params.get('token') })
      if (res.status === 200) {
        setisLoading(false)
        loginActions(res?.data?.user, push, rememberMe)
      }
    } catch (error) {
      setisLoading(false)
      console.error(error)
      push('/login')
    }
  }, [params, push, rememberMe])

  useEffect(() => {
    if (params.has('token')) {
      checkTokenFn()
    } else {
      if (params.has('to') && params.get('to') === 'logout') {
        redirect(`${LANDING_URL}/logout`)
      }
    }
  }, [params, push, checkTokenFn])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen gap-x-3'>
        <Typography variant='h3' className='font-light'>
          Please wait
        </Typography>
        <Loader className='animate-spin text-text-heading size-10' />
      </div>
    )
  }
  return (
    <div className='flex items-center justify-center min-h-screen gap-x-3'>
      <Typography variant='h3' className='font-light'>
        Redirecting, please wait
      </Typography>
      <Loader className='animate-spin text-text-heading size-10' />
    </div>
  )
}
