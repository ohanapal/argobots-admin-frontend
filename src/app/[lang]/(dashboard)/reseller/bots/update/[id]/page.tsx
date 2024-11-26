import UpdateBotForm from '@/components/pages/admin/bots/UpdateBotForm'

export const metadata = {
  title: 'Update Bot | Argobot'
}

export default function UpdateBotPage() {
  return <UpdateBotForm updateFrom='reseller' />
}
