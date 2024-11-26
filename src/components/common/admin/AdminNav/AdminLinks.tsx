'use client'

import { Accordion } from '@/components/ui/accordion'
import LLink from '@/components/ui/llink'
import { AdminLink } from '@/constants/admin-nav-links'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import NestedLink from './NestedLink'

interface Props {
  links: Array<AdminLink>
  currentLink?: string
  setnavbarOpen: Dispatch<SetStateAction<boolean>>
}

export default function AdminLinks({ links, setnavbarOpen }: Props) {
  // For open the active accordion link automatically on page reload
  const pathname = usePathname()
  const currentLinkObj = links.find(link => pathname.includes(link.href))
  const currentLinkVal = currentLinkObj?.hasChildren ? currentLinkObj.href : undefined
  const [currentAccordionLink, setcurrentAccordionLink] = useState<string | undefined>()

  useEffect(() => {
    setcurrentAccordionLink(currentLinkVal)
  }, [currentLinkVal])

  return (
    <ul className='flex flex-col items-center w-full overflow-x-hidden'>
      <Accordion
        type='single'
        collapsible
        className='w-full'
        value={currentAccordionLink}
        onValueChange={setcurrentAccordionLink}
      >
        {links.length ? (
          links.map(link =>
            link.hasChildren ? (
              <li key={link.id} className='w-full'>
                <NestedLink link={link} setnavbarOpen={setnavbarOpen} />
              </li>
            ) : (
              <li key={link.id} className='w-full relative hover:bg-gray-primary'>
                <LLink
                  href={link.href}
                  className={cn('w-full text-gray-light text-left text-sm text-text-primary h-12 flex items-center', {
                    'font-bold bg-gray-primary': pathname.includes(link.href)
                  })}
                  onClick={() => setnavbarOpen(false)}
                >
                  <span className='ml-5 mr-2'>
                    <link.icon
                      className={cn('size-5 text-text-gray-light', {
                        'text-text-primary': pathname.includes(link.href)
                      })}
                      strokeWidth={pathname.includes(link.href) ? 2 : 1.5}
                    />
                  </span>
                  {link.label}
                </LLink>
                {pathname.includes(link.href) && (
                  <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-dark to-cyan-dark' />
                )}
              </li>
            )
          )
        ) : (
          <div className='flex items-center justify-center mt-5'>
            <Loader className='animate-spin text-text-secondary size-6' />
          </div>
        )}
      </Accordion>
    </ul>
  )
}
