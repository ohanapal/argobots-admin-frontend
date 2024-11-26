import ChatAvatar from '@/components/pages/admin/bots/common/ChatPreview/ChatAvatar'
import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { cn } from '@/lib/utils'

interface Props {
  message: string
  imgSrc?: string
  isDark: boolean
}

export default function LeftChat({ message, imgSrc, isDark }: Props) {
  return (
    <div className='flex justify-start pl-2 max-w-full'>
      <div className='flex flex-col sm:flex-row md:flex-col min-[920px]:flex-row lg:flex-col xl:flex-row gap-y-1 gap-x-2 max-w-3xl w-[80%] justify-start'>
        <ChatAvatar imgSrc={imgSrc} />
        <CardWrapper
          className={cn('p-2.5 bg-gray-secondary rounded-xl max-w-xl overflow-x-auto', {
            'border-transparent': isDark
          })}
        >
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            className={cn(
              'prose max-w-full text-sm prose-headings:my-3 prose-p:my-1 text-text-primary prose-headings:text-text-primary [&>div]:max-w-full [&>div]:w-full [&>div]:overflow-x-auto'
            )}
          />
        </CardWrapper>
      </div>
    </div>
  )
}
