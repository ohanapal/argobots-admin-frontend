'use client'

import useWindowWidth from '@/hooks/useWindowWidth'
import { useGetBotQuery } from '@/redux/features/botsApi'
import { useGetThreadMessagesQuery } from '@/redux/features/threadsApi'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThreadData from './ThreadData'
import ThreadMessages from './ThreadMessages'
import ThreadsSidebar from './ThreadsSidebar'

export default function BotThreads() {
  const [currThread, setcurrThread] = useState<undefined | string>(undefined)
  const [threadSidebarOpen, setthreadSidebarOpen] = useState(true)
  const [theadDataSidebarOpen, settheadDataSidebarOpen] = useState(true)

  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth < 1280) settheadDataSidebarOpen(false)
    if (windowWidth < 768) setthreadSidebarOpen(false)
  }, [windowWidth])

  const { data } = useGetThreadMessagesQuery(currThread, { skip: !currThread })

  const { id } = useParams()
  const { data: botData } = useGetBotQuery(id as string)
  return (
    <div className='-mt-4 -mb-7 -ml-7 -mr-7 flex'>
      <ThreadsSidebar
        currThread={currThread}
        setcurrThread={setcurrThread}
        threadSidebarOpen={threadSidebarOpen}
        setthreadSidebarOpen={setthreadSidebarOpen}
        botData={botData}
      />
      <ThreadMessages
        currThread={currThread}
        threadSidebarOpen={threadSidebarOpen}
        setthreadSidebarOpen={setthreadSidebarOpen}
        theadDataSidebarOpen={theadDataSidebarOpen}
        settheadDataSidebarOpen={settheadDataSidebarOpen}
        botData={botData}
        messages={data?.messages || []}
      />
      <ThreadData
        currThread={currThread}
        botData={botData}
        theadDataSidebarOpen={theadDataSidebarOpen}
        settheadDataSidebarOpen={settheadDataSidebarOpen}
        messages={data?.messages || []}
      />
    </div>
  )
}
