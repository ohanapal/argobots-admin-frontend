import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { Img } from '@/components/ui/img'
import { BOT_URL } from '@/configs'
import { cn } from '@/lib/utils'
import { WithId } from '@/types/common/IResponse'
import { IBot } from '@/types/IBot'
import { BetweenHorizonalStart, PanelRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Dispatch, SetStateAction, useCallback } from 'react'
import LeftChat from './LeftChat'
import RightChat from './RightChat'

export interface IThreadMessage {
  role: 'assistant' | 'user'
  _id: string
  content: MessageContent[]
}

interface MessageContent {
  text: {
    value: string
  }
}
interface Props {
  currThread: undefined | string
  threadSidebarOpen: boolean
  setthreadSidebarOpen: Dispatch<SetStateAction<boolean>>
  theadDataSidebarOpen: boolean
  settheadDataSidebarOpen: Dispatch<SetStateAction<boolean>>
  botData: { data: WithId<IBot>; totalStorage: number }
  messages: IThreadMessage[]
}

export default function ThreadMessages({
  threadSidebarOpen,
  setthreadSidebarOpen,
  theadDataSidebarOpen,
  settheadDataSidebarOpen,
  botData,
  messages
}: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const { embedding_url, bg_light, bg_dark, logo_light, logo_dark, name, user_logo, bot_logo } = { ...botData?.data }

  const getSrc = useCallback(
    (lightSrc: string, darkSrc: string): string => {
      return isDark && darkSrc ? darkSrc : lightSrc
    },
    [isDark]
  )

  const url = `${BOT_URL}/${embedding_url}`

  return (
    <div
      className={cn(
        'bg-cover bg-center flex-1 pl-0 pr-0 transition-all duration-300 bg-fixed relative h-[calc(100vh_-_80px)] overflow-auto',
        {
          'pl-0 md:pl-72': threadSidebarOpen,
          'pr-0 lg:pr-96': theadDataSidebarOpen
        }
      )}
    >
      <div
        className={cn('bg-foreground p-2 flex flex-wrap items-center justify-between sticky top-0 z-20', {
          'bg-gray-800 text-white': isDark
        })}
      >
        <div className={cn('flex items-center justify-between gap-3 w-full')}>
          <div className='flex items-center gap-3'>
            <PanelRight
              className='cursor-pointer size-7 min-w-7'
              onClick={() => setthreadSidebarOpen(prev => !prev)}
              strokeWidth={1.5}
            />
            <div className='size-12 min-w-12 rounded-lg overflow-hidden'>
              {getSrc(logo_light, logo_dark) ? (
                <Img src={getSrc(logo_light, logo_dark)} alt={name} className='size-full aspect-square object-cover' />
              ) : (
                <Img src={companyPlaceholder} alt={name} className='size-full aspect-square object-cover' />
              )}
            </div>

            <div className='space-y-1'>
              <p>{name}</p>
              <a href={url} target='_blank' className='text-blue-primary text-xs font-semibold break-words break-all'>
                {url}
              </a>
            </div>
          </div>

          <BetweenHorizonalStart
            className='cursor-pointer size-7 min-w-7'
            strokeWidth={1.5}
            onClick={() => settheadDataSidebarOpen(prev => !prev)}
          />
        </div>
      </div>
      <div className={cn('w-full h-px bg-gray-primary', { 'bg-black': isDark })} />

      <div
        className={cn('space-y-5 py-5 min-h-[calc(100%_-_65px)]', {
          'bg-gray-primary': !isDark && !bg_light,
          'bg-gray-800': isDark && !bg_dark
        })}
      >
        {messages?.map(msg => (
          <div key={msg?.content[0]?.text?.value}>
            {msg?.role === 'user' ? (
              <RightChat message={msg?.content[0]?.text?.value} imgSrc={user_logo} isDark={isDark} />
            ) : (
              <LeftChat message={msg?.content[0]?.text?.value} imgSrc={bot_logo} isDark={isDark} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
