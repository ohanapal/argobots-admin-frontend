import Typography from '@/components/ui/typography'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import CardIcon from './commonn/card-icon'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  title: string
  number: string
  iconGradientClassName?: string
  difference?: string
}

export default function StatisticsCard({ icon: Icon, title, number, iconGradientClassName, difference }: Props) {
  return (
    <CardWrapper>
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          <p className='text-base font-medium text-text-secondary'>{title}</p>
          <Typography variant='h3' className='font-medium'>
            {number}
          </Typography>
        </div>
        <CardIcon iconGradientClassName={iconGradientClassName} icon={Icon} />
      </div>

      <p className='text-text-primary-muted mt-4'>{+difference === 0 ? '+0' : difference} today</p>
    </CardWrapper>
  )
}
