import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Hint from '../common/hint'

interface Props {
  children: ReactNode
  value: string
  label: string
  className?: string
  hint?: string
}

export default function SingleAccordion({ children, value, label, className, hint }: Props) {
  return (
    <Accordion type='single' defaultValue={value} collapsible className={cn('w-full', className)}>
      <AccordionItem value={value} className='border-b-0'>
        <AccordionTrigger>
          <span className='inline-flex items-center gap-x-2'>
            {label} {hint ? <Hint>{hint}</Hint> : null}
          </span>
        </AccordionTrigger>
        <AccordionContent className='p-1'>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
