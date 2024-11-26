'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

export const referrerList = [
  { label: 'Not selected', value: undefined },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Web', value: 'web' },
  { label: 'Others', value: 'others' }
]

interface Props extends HTMLAttributes<HTMLDivElement> {
  referrer: string | undefined
  setreferrer: Dispatch<SetStateAction<string | undefined>>
  className?: string
}

export default function ReferrerSelector({ referrer, setreferrer, className, ...rest }: Props) {
  return (
    <div {...rest} className={cn('space-x-1 space-y-1 p-1 shadow-md inline-block rounded-lg mb-3', className)}>
      {referrerList.map(({ label, value }) => (
        <Button key={value} onClick={() => setreferrer(value)} variant={referrer === value ? 'secondary' : 'unstyled'}>
          {label}
        </Button>
      ))}
    </div>
  )
}
