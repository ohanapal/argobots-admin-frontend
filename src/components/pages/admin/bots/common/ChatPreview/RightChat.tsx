import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { cn } from '@/lib/utils'
import ChatAvatar from './ChatAvatar'

interface Props {
  message: string
  imgSrc?: string
  sources: {
    primary_color: string
    primary_color_dark: string
    secondary_font_color: string
    secondary_font_color_dark: string
  }
  isDark: boolean
}

export default function RightChat({ message, imgSrc, sources, isDark }: Props) {
  const { secondary_font_color, secondary_font_color_dark } = { ...sources }

  return (
    <div className='flex justify-end pr-2'>
      <div
        className={cn(
          'flex items-end gap-y-1 gap-x-2 max-w-3xl w-[80%] justify-end',
          'flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-col-reverse xl:flex-row',
          'sm:items-start md:items-end lg:items-end xl:items-start'
        )}
      >
        <CardWrapper
          className={cn('p-2.5 border-0 shadow-none', { 'border-transparent': isDark })}
          style={{
            backgroundColor: 'transparent',
            color: isDark ? secondary_font_color_dark : secondary_font_color
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            style={{
              color: isDark ? secondary_font_color_dark : secondary_font_color
            }}
            className={cn('prose max-w-full text-sm prose-headings:my-3 prose-p:my-1')}
          />
        </CardWrapper>
        <ChatAvatar imgSrc={imgSrc} />
      </div>
    </div>
  )
}
