'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  className?: string
}
export default function BackButton({ label, ...rest }: Props) {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} {...rest} icon={<ChevronLeft />} variant='outline'>
      {label || 'Go Back'}
    </Button>
  )
}
