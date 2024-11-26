import ChatAvatar from '@/components/pages/admin/bots/common/ChatPreview/ChatAvatar'
import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { cn } from '@/lib/utils'

interface Props {
  message: string
  imgSrc?: string

  isDark: boolean
}

export default function RightChat({ message, imgSrc, isDark }: Props) {
  return (
    <div className='flex justify-end pr-2'>
      <div
        className={cn(
          'flex items-end gap-y-1 gap-x-2 max-w-3xl w-[80%] justify-end',
          'flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-col-reverse xl:flex-row',
          'sm:items-start md:items-end lg:items-end xl:items-start'
        )}
      >
        <CardWrapper className={cn('p-2.5 rounded-xl bg-primary', { 'border-transparent': isDark })}>
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            className={cn(
              'prose max-w-full text-sm prose-headings:my-3 prose-p:my-1 text-white prose-headings:text-white'
            )}
          />
        </CardWrapper>
        <ChatAvatar imgSrc={imgSrc} />
      </div>
    </div>
  )
}
