'use client'

import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetThreadMutation } from '@/redux/features/botsApi'
import { WithId } from '@/types/common/IResponse'
import { IBot } from '@/types/IBot'
import { formateDate } from '@/utils/date/formateDate'
import { formatDistance } from 'date-fns'
import { useEffect } from 'react'
import LeafletMap from './Map'
import { IThreadMessage } from './ThreadMessages'

interface Props {
  currThread: undefined | string
  botData: { data: WithId<IBot>; totalStorage: number }
  messages: IThreadMessage[]
}
export default function ThreadData({ currThread, botData, messages }: Props) {
  const [getThreadData, { data, isSuccess, isLoading }] = useGetThreadMutation()

  useEffect(() => {
    if (currThread) getThreadData(currThread)
  }, [currThread, getThreadData])

  const { lat = 0, long = 0, address = '' } = data?.thread?.location || {}
  return (
    <div className='w-52 border-l-2'>
      {isLoading && (
        <div className='py-10 flex flex-col items-center justify-center gap-y-3'>
          <Skeleton className='size-16 rounded-full' />
          <Skeleton className='w-3/4 h-24' />
          <Skeleton className='w-full h-40' />
          <Skeleton className='w-3/4 h-32' />
        </div>
      )}
      {isSuccess && (
        <div>
          <div className='flex flex-col items-center justify-center pt-6 text-center text-balance'>
            {botData?.data?.user_logo && (
              <Img
                src={botData?.data?.user_logo}
                alt={botData?.data?.name}
                className='size-16 rounded-lg overflow-hidden aspect-square object-cover'
              />
            )}
            <p className='mt-3 mb-1 font-semibold'>{data?.thread?.location?.address}</p>
            <p className='text-sm font-medium text-text-secondary'>
              {formateDate(String(data?.thread?.createdAt), true)}
            </p>
          </div>

          {isSuccess && lat && long && <LeafletMap lat={lat} lng={long} address={address} className='mt-6' />}
          <div className='mt-6 px-2'>
            <p className='font-semibold text-text-secondary mb-2'>Additional Info</p>
            <p className='text-sm font-medium'>
              <span className='text-text-gray'>Total Messages:</span> {messages?.length}
            </p>
            <p className='text-sm font-medium mt-1'>
              <span className='text-text-gray'>Last seen: </span>
              {formatDistance(data?.thread?.last_seen, new Date(), { addSuffix: true })}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
