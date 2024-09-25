'use client'
import Typography, { type TypographyVariant } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { CopyIcon } from 'lucide-react'
import React, { HTMLAttributes, ReactNode, useState } from 'react'
import toast from 'react-hot-toast'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string,
  id?: string,
  extra?: ReactNode
  className?: string
  variant?: TypographyVariant
}


export default function DashboardHeading({ title, id, extra, className, variant = 'h3', ...props }: Props) {
  const [showId, setShowId] = useState(false)

  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-x-5 gap-y-3 mb-6', className)} {...props}>
      <div>
        <Typography variant={variant}>{title}</Typography>
        {
          id &&
          <div className='flex items-center gap-x-2 mt-2'>
            <input
              type="checkbox"
              id="toggleId"
              className='w-4 h-4'
              checked={showId}
              onChange={() => setShowId(!showId)}
            />
            <label htmlFor="toggleId"> {showId && id ?
              <p className='relative mt-1 flex gap-2 items-center cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(id)
                  toast.success('Bot ID copied to clipboard', { duration: 2000 })
                }}
              >
                <span className=' blur-sm'>{id}</span>
                <span className=' flex items-center gap-2 hover:bg-slate-100 transition px-2 py-1'>
                  <CopyIcon className='cursor-pointer w-4 h-4' />
                  <span >COPY BOT ID </span>
                </span>

              </p> : <span>Expose BOT ID</span>} </label>
          </div>
        }
      </div>

      <div className='flex flex-wrap items-center gap-x-5'>{extra}</div>
    </div>
  )
}
