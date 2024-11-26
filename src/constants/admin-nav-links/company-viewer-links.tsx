import { BaggageClaim, Blocks, BotMessageSquare, Boxes, Users } from 'lucide-react'
import { AdminLink } from '.'

export const companyViewerLinks: Array<AdminLink> = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/company/dashboard',
    hasChildren: false,
    icon: Blocks
  },
  {
    id: 2,
    label: 'Company',
    hasChildren: false,
    icon: BaggageClaim,
    href: '/company/details'
  },
  {
    id: 3,
    label: 'AI Tools',
    href: '/company/bots',
    hasChildren: false,
    icon: BotMessageSquare
  },
  {
    id: 4,
    label: 'Team',
    hasChildren: false,
    icon: Users,
    href: '/company/team'
  },
  {
    id: 5,
    label: 'Subscriptions',
    hasChildren: false,
    icon: Boxes,
    href: '/company/subscriptions'
  }
]
