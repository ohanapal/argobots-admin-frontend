import BotAllImages from '@/components/pages/admin/bots/BotImages/BotAllImages'
import BackButton from '@/components/pages/admin/bots/common/BackButton'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Bot Images | Argobot'
}

export default function BotAllImagesPage() {
  return (
    <>
      <DashboardHeading title='Bot Images' extra={<BackButton />} />
      <BotAllImages />
    </>
  )
}
