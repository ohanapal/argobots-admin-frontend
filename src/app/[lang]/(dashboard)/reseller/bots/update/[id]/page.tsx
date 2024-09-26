import UpdateBotForm from '@/components/pages/admin/bots/UpdateBotForm'

export const metadata = {
  title: 'Update Bot | Argobots'
}

export default function UpdateBotPage() {
  return <UpdateBotForm updateFrom='reseller' />
}
