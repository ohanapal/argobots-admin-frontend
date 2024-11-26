import CreatePackageForm from '@/components/pages/admin/packages/CreatePackageForm'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import React from 'react'

export const metadata = {
  title: 'Add a Package | Argobot'
}

export default function PackageCreatePage() {
  return (
    <>
      <DashboardHeading title='Add a Package' />
      <CreatePackageForm />
    </>
  )
}
