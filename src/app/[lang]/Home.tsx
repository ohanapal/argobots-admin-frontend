'use client'

import { redirectToDashboard } from '@/components/common/admin/AdminNav/AdminSideNav'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { getCookie } from 'cookies-next'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'

export default function Home() {
  const push = usePush()
  useEffect(() => {
    const userData = getCookie('userData')
    if (userData) redirectToDashboard(push)
    else push('/login')
  }, [push])

  return (
    <div className='flex items-center justify-center min-h-screen gap-x-3'>
      <Typography variant='h3' className='font-light'>
        Redirecting, please wait
      </Typography>
      <Loader className='animate-spin text-text-heading size-10' />
    </div>
  )
}
