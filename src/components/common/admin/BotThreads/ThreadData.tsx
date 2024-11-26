'use client'

import { Img } from '@/components/ui/img'
import { threadSummaryPrompt } from '@/constants/openai/prompts'
import { axiosInstance } from '@/lib/axios/interceptor'
import { cn } from '@/lib/utils'
import { useGetThreadMutation, useUpdateThreadMutation } from '@/redux/features/threadsApi'
import { WithId } from '@/types/common/IResponse'
import { IBot } from '@/types/IBot'
import { formateDate } from '@/utils/date/formateDate'
import { formatDistance } from 'date-fns'
import { X } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import LeafletMap from './Map'
import { IThreadMessage } from './ThreadMessages'

const isTimePassed = (prevTime, timeDifference) => {
  const formattedDate = new Date(prevTime).getTime()
  const currentDate = new Date().getTime()
  const differenceInMs = currentDate - formattedDate
  const differenceInMinutes = differenceInMs / (1000 * 60)
  return differenceInMinutes >= timeDifference
}

const convertHtmlToPlainText = html => {
  // Create a temporary element to parse HTML
  const temporaryDiv = document.createElement('div')
  temporaryDiv.innerHTML = html

  // Extract text content
  let plainText = temporaryDiv.textContent || temporaryDiv.innerText || ''

  // Remove multiple spaces and trim each line
  plainText = plainText
    .split('\n') // Split into lines
    .map(line => line.trim()) // Trim each line
    .filter(line => line !== '') // Remove empty lines
    .join('\n') // Join lines with a single newline

  return plainText
}

interface Props {
  currThread: undefined | string
  botData: { data: WithId<IBot>; totalStorage: number }
  messages: IThreadMessage[]
  theadDataSidebarOpen: boolean
  settheadDataSidebarOpen: Dispatch<SetStateAction<boolean>>
}
export default function ThreadData({
  messages,
  currThread,
  botData,
  theadDataSidebarOpen,
  settheadDataSidebarOpen
}: Props) {
  // Getting thread data
  const [getThreadData, { data, isSuccess, isLoading }] = useGetThreadMutation()
  // Generating summary
  const [updateThread, { isSuccess: isUpdateSuccess }] = useUpdateThreadMutation()
  useEffect(() => {
    if (currThread || isUpdateSuccess) {
      getThreadData(currThread)
    }
  }, [currThread, getThreadData, isUpdateSuccess])

  useEffect(() => {
    ;(async () => {
      if (currThread && isSuccess) {
        try {
          if (
            data?.thread?.summary?.last_update &&
            (isTimePassed(data?.thread?.summary?.last_update, 30) || data?.thread?.summary?.text === '')
          ) {
            const messagesRes = await axiosInstance.get(`/threads/messages/${currThread}`)
            const messagesArr = messagesRes?.data?.messages
            if (messagesArr?.length > 0) {
              const messagesTogether = messagesArr
                .map(msg => `${msg.role}: ${convertHtmlToPlainText(msg?.content?.[0]?.text?.value)}`)
                .join('\n')

              const summaryRes = await axiosInstance.post('/threads/run-chat-completion', {
                text: threadSummaryPrompt(messagesTogether)
              })

              const summary = summaryRes?.data?.message
              if (summary) {
                updateThread({ thread_id: currThread, summary })
              }
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currThread])

  // Extracting location data from the thread
  const { lat = 0, long = 0, address = '' } = data?.thread?.location || {}

  return (
    <div
      className={cn(
        'w-full min-[400px]:w-96 fixed right-0 transition-all duration-300 border-l-0 min-[400px]:border-l-2 h-[calc(100vh_-_80px)] overflow-auto isolate z-50 bg-background',
        {
          'w-0 min-[400px]:w-0 overflow-hidden': !theadDataSidebarOpen
        }
      )}
    >
      {isLoading && (
        <div className='animate-pulse'>
          <div className='flex flex-col items-center justify-center pt-6 text-center text-balance'>
            <div className='w-16 h-16 bg-muted rounded-full'></div>
            <p className='mt-3 mb-1 font-semibold h-4 bg-muted rounded w-3/4'></p>
            <div className='h-4 bg-muted rounded w-1/4 mt-1'></div>
          </div>

          <div className='mt-6 h-64 bg-muted rounded'></div>

          <div className='mt-6 px-2'>
            <div className='font-semibold text-text-secondary h-4 bg-muted rounded mb-2 w-1/2'></div>
            <div className='text-sm font-medium h-4 bg-muted rounded w-1/4'>
              <span className='text-text-gray'></span>
            </div>
            <div className='text-sm font-medium h-4 bg-muted rounded w-1/4 mt-1'>
              <span className='text-text-gray'></span>
            </div>
          </div>

          <div className='mt-6 px-2 pb-6'>
            <div className='font-semibold text-text-secondary h-4 bg-muted rounded mb-2'></div>
            <div className='h-32 bg-muted rounded'></div>
          </div>
        </div>
      )}
      {isSuccess && (
        <div>
          <div className='flex md:hidden items-center justify-end pr-5 pt-2'>
            <X onClick={() => settheadDataSidebarOpen(false)} className='cursor-pointer ' />
          </div>
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

          {isSuccess && lat && long ? <LeafletMap lat={lat} lng={long} address={address} className='mt-6' /> : null}
          <div className='mt-6 px-2'>
            <p className='font-semibold text-text-secondary mb-2'>Additional Info</p>
            <p className='text-sm font-medium'>
              <span className='text-text-gray'>Total Messages:</span> {messages?.length}
            </p>
            {data?.thread?.last_seen && (
              <p className='text-sm font-medium mt-1'>
                <span className='text-text-gray'>Last seen: </span>
                {formatDistance(data?.thread?.last_seen, new Date(), { addSuffix: true })}
              </p>
            )}
          </div>

          {data?.thread?.summary?.text && (
            <div className='mt-6 px-2 pb-6'>
              <p className='font-semibold text-text-secondary mb-2'>Summary</p>
              <div
                dangerouslySetInnerHTML={{ __html: data?.thread?.summary?.text }}
                className={cn(
                  'prose max-w-full text-sm prose-headings:my-3 prose-p:my-1 prose-headings:text-text-primary [&>div]:max-w-full [&>div]:w-full [&>div]:overflow-x-auto text-text-gray prose-ul:pl-3 prose-li:p-0'
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
