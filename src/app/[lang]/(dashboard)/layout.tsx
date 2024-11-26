export const dynamic = 'force-dynamic'

import AdminNav from '@/components/common/admin/AdminNav/AdminNav'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const allCookies = cookies()
  const token = allCookies.get('refreshToken')?.value

  const isAuth = !!token
  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div suppressHydrationWarning>
      <AdminNav />
      <section className='pt-24 pl-7 lg:pl-[292px] pr-7 pb-7 bg-background min-h-screen'>{children}</section>
    </div>
  )
}
