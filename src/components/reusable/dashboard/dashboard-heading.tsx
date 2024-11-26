import Typography, { type TypographyVariant } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'
import Hint from '../common/hint'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  extra?: ReactNode
  className?: string
  variant?: TypographyVariant
  hint?: string
}

export default function DashboardHeading({ title, extra, className, variant = 'h3', hint, ...props }: Props) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-x-5 gap-y-3 mb-6', className)} {...props}>
      <div className='flex items-center gap-x-1'>
        <Typography variant={variant}>{title}</Typography>
        {hint ? <Hint>{hint}</Hint> : null}
      </div>
      <div className='flex flex-wrap items-center gap-x-5'>{extra}</div>
    </div>
  )
}
