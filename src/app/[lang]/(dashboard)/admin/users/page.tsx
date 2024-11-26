import AllUsers from '@/components/pages/admin/users/AllUsers'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Users | Argobot'
}

export default function Users() {
  return (
    <>
      <DashboardHeading title='All Users' />
      <AllUsers />
    </>
  )
}