'use client'

import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetAllThreadQuery } from '@/redux/features/threadsApi'
import { WithId } from '@/types/common/IResponse'
import { IBot } from '@/types/IBot'
import { formateDate } from '@/utils/date/formateDate'
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { renderReferrer } from './renderIcon'

interface Props {
  currThread: undefined | string
  setcurrThread: Dispatch<SetStateAction<undefined | string>>
  threadSidebarOpen: boolean
  setthreadSidebarOpen: Dispatch<SetStateAction<boolean>>
  botData: { data: WithId<IBot>; totalStorage: number }
}

export default function ThreadsSidebar({
  currThread,
  setcurrThread,
  threadSidebarOpen,
  setthreadSidebarOpen,
  botData
}: Props) {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useGetAllThreadQuery(
    { bot_id: id as string, limit: 100, sortBy: 'createdAt', sortOrder: 'desc' },
    { skip: !id }
  )

  useEffect(() => {
    if (isSuccess) setcurrThread(data?.data?.[0]?._id)
  }, [isSuccess, data, setcurrThread])

  return (
    <div
      className={cn(
        'w-72 bg-gray-secondary h-[calc(100vh_-_80px)] overflow-y-auto fixed transition-all duration-300 py-3 z-30',
        {
          'w-0 overflow-hidden': !threadSidebarOpen
        }
      )}
    >
      {isLoading && (
        <div className='space-y-2 px-2'>
          {Array.from({ length: 20 }, (_, i) => (
            <Skeleton key={i} className='h-10 w-full rounded-lg' />
          ))}
        </div>
      )}
      {isSuccess &&
        botData &&
        (data?.data?.length ? (
          <div className='space-y-2 px-2 w-full'>
            <div className='flex md:hidden items-center justify-end pr-5 py-2'>
              <X onClick={() => setthreadSidebarOpen(false)} className='cursor-pointer' />
            </div>
            {data.data.map(thread => (
              <div
                onClick={() => setcurrThread(thread._id)}
                key={thread._id}
                className={cn('flex items-center gap-x-3 cursor-pointer rounded-lg p-2', {
                  'bg-gray-200 dark:bg-gray-500 shadow-sm': thread?._id === currThread
                })}
              >
                {botData?.data?.user_logo && (
                  <Img
                    src={botData?.data?.user_logo}
                    alt={botData?.data?.name}
                    className='size-12 rounded-lg overflow-hidden aspect-square object-cover'
                  />
                )}
                <div className='space-y-1'>
                  <div className='flex items-center gap-x-1'>
                    <p
                      key={thread._id}
                      className={cn(
                        'w-40 rounded-lg text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis',
                        {
                          'w-44': !renderReferrer(thread.source)
                        }
                      )}
                    >
                      {thread.name || 'Untitled Chat'}
                    </p>
                    {renderReferrer(thread.source) && (
                      <Img src={renderReferrer(thread.source)} alt={thread.name} className='size-5' />
                    )}
                  </div>
                  <p className='text-xs font-medium text-text-secondary'>{formateDate(thread.createdAt, true)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Threads</p>
        ))}
    </div>
  )
}
