import CompanyInviteForm from '@/components/pages/admin/companies/CompanyInviteForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Invite Company | Argobots'
}

export default function InviteCompanyPage() {
  return (
    <>
      <DashboardHeading title='Invite Company' />
      <CompanyInviteForm />
    </>
  )
}
