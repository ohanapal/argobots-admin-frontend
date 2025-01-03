'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import StatisticsCardSkeletons from '@/components/reusable/cards/Skeletons/statistics-card-skeletons'
import StatisticsCard from '@/components/reusable/cards/statistics-card'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { getUserRole } from '@/helpers/common'
import { getCompanyId } from '@/helpers/pages/companies'
import { useDashboardAnalyticsQuery } from '@/redux/features/dashboardsApi'
import { useGetUserQuery } from '@/redux/features/usersApi'
import { getUserId } from '@/utils/auth/getUserId'
import { Bot, Building2, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import AnalyticsSelector from './AnalyticsSelector'

export interface AnalyticsParams {
  filter: string | undefined
  company_id?: string
}

export default function Analytics() {
  const [params, setparams] = useState<AnalyticsParams>({ filter: undefined })

  useEffect(() => {
    if (['company-admin', 'editor', 'viewer'].includes(getUserRole())) {
      setparams(prevParams => ({ ...prevParams, company_id: getCompanyId() }))
    }
  }, [])

  const { data, isLoading, isSuccess } = useDashboardAnalyticsQuery(params)
  const { data: userData, isLoading: isUserLoading, isSuccess: isUserSuccess } = useGetUserQuery(getUserId())

  return (
    <div>
      {isUserLoading && (
        <div className='flex flex-wrap items-center gap-x-5 gap-y-2 justify-between'>
          <Skeleton className='w-full max-w-xl h-16' />
          <Skeleton className='w-full max-w-sm h-10' />
        </div>
      )}
      {isUserSuccess && (
        <div className='flex flex-wrap items-end gap-x-5 gap-y-2 justify-between'>
          <div className='space-y-1'>
            <Typography variant='h2'>Welcome back {userData?.user?.name}</Typography>
            <p className='text-text-secondary text-lg'>
              See the Analytics and the other important data in the dashboard
            </p>
          </div>
          <AnalyticsSelector params={params} setparams={setparams} />
        </div>
      )}

      <StatisticsCardSkeletons isLoading={isLoading} className='mt-6' />

      {isSuccess && (
        <CardGrid total={['company-admin', 'editor', 'viewer'].includes(getUserRole()) ? 2 : 3} className='mt-6'>
          <StatisticsCard
            title='Total Bots'
            icon={Bot}
            iconGradientClassName='from-violet-600 to-cyan-300'
            number={data?.botCount}
            difference={data?.botDifference}
          />

          {!['company-admin', 'editor', 'viewer'].includes(getUserRole()) && (
            <StatisticsCard
              title='Companies'
              icon={Building2}
              iconGradientClassName='from-violet-600 to-cyan-300'
              number={data?.companyCount}
              difference={data?.comapanyDifference}
            />
          )}

          <StatisticsCard
            title='Documents'
            icon={FileText}
            iconGradientClassName='from-violet-600 to-cyan-300'
            number={data?.fileCount}
            difference={data?.fileDifference}
          />
        </CardGrid>
      )}
    </div>
  )
}
