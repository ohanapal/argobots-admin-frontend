'use client'

import logo from '@/assets/images/common/logo.png'
import { Img } from '@/components/ui/img'
import { AdminLink } from '@/constants/admin-nav-links'
import usePush from '@/hooks/usePush'
import { getCookie } from 'cookies-next'
import { Dispatch, SetStateAction } from 'react'
import AdminLinks from './AdminLinks'

interface Props {
  currentLink?: string
  links: AdminLink[]
  setnavbarOpen: Dispatch<SetStateAction<boolean>>
}

export const redirectToDashboard = push => {
  const userData = getCookie('userData')
  const user = userData && JSON.parse(userData)
  const userRole = user.type
  if (['super-admin', 'admin'].includes(userRole)) {
    push('/admin/dashboard')
  } else if (['company-admin', 'user'].includes(userRole)) {
    push('/company/dashboard')
  } else if (userRole === 'reseller') {
    push('/reseller/dashboard')
  }
}

export default function AdminSideNav({ currentLink, links, setnavbarOpen }: Props) {
  const push = usePush()

  return (
    <nav className='fixed top-0 left-0 w-[264px] border-r bg-foreground border-r-gray-primary h-screen hidden lg:flex flex-col items-center justify-between overflow-y-auto'>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='mb-5 w-full p-5 cursor-pointer' onClick={() => redirectToDashboard(push)}>
          {/* {isLoading ? <Skeleton className='w-28 h-7 rounded-sm' /> : isSuccess ? title : 'Dashboard'} */}
          <Img src={logo} alt='Argobots' className='h-8 w-auto' />
        </div>

        <AdminLinks links={links} currentLink={currentLink} setnavbarOpen={setnavbarOpen} />
      </div>

      {/* <div className='p-5 w-full'>
        <Button onClick={handleLogout} className='w-full rounded-md h-12'>
          Log Out
        </Button>
      </div> */}
    </nav>
  )
}
