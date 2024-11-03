'use client'

import { useGetBotQuery, useGetThreadMessagesQuery } from '@/redux/features/botsApi'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import ThreadData from './ThreadData'
import ThreadMessages from './ThreadMessages'
import ThreadsSidebar from './ThreadsSidebar'

export default function BotThreads() {
  const [currThread, setcurrThread] = useState<undefined | string>(undefined)
  const [threadSidebarOpen, setthreadSidebarOpen] = useState(true)

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
        botData={botData}
        messages={data?.messages || []}
      />
      <ThreadData currThread={currThread} botData={botData} messages={data?.messages || []} />
    </div>
  )
}
