'use client'

import LLink from '@/components/ui/llink'
import { BOT_URL } from '@/configs'
import { getDashboardURLPath, getUserRole } from '@/helpers/common'
import { useLogo } from '@/hooks/useLogo'
import { useDeleteBotMutation } from '@/redux/features/botsApi'
import { formateDate } from '@/utils/date/formateDate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { CopyIcon, Eye, MessagesSquare, PencilLine, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import Badge from './badge'
import CardAvatar from './commonn/card-avatar'
import CardBetween from './commonn/card-between'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardCeparatorBorder from './commonn/card-separator-border'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  _id: string
  logo_light?: string
  logo_dark?: string
  name: string
  category: string
  model: string
  createdAt: string
  embedding_url: string
  company_id?: string
}

export default function BotCard({
  logo_light,
  logo_dark,
  name,
  category,
  createdAt,
  embedding_url,
  _id,
  company_id
}: Props) {
  const imgSrc = useLogo(logo_light!, logo_dark!)
  const [deleteBot, { isSuccess, isError, error }] = useDeleteBotMutation()
  const [open, setopen] = useState<boolean>(false)
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if (isSuccess) toast.success('Bot deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  const url = `${BOT_URL}/${embedding_url}`

  return (
    <>
      <CardWrapper>
        <CardPopover>
          <a href={url} target='_blank' className='flex items-center justify-between'>
            <p className='text-sm font-medium text-text-secondary'>View Bot</p>
            <Eye className='size-5' />
          </a>

          <LLink href={`${getDashboardURLPath()}/bots/${_id}/threads`}>
            <CardPopoverContent text='View threads' icon={<MessagesSquare className='text-cyan-dark' />} />
          </LLink>

          {getUserRole() !== 'viewer' && (
            <>
              <LLink href={`${getDashboardURLPath()}/bots/update/${_id}?companyId=${company_id}`}>
                <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} />
              </LLink>

              <CardPopoverContent
                text='Delete'
                icon={<Trash2 className='text-destructive' />}
                onClick={() => setopen(true)}
              />
            </>
          )}
        </CardPopover>

        <div className='flex flex-col items-center justify-center gap-y-2'>
          <CardAvatar imgSrc={imgSrc} name={name} />
          <p className='text-sm font-semibold text-text-heading mt-2'>{name}</p>
          <Badge variant='blue' className='break-all'>
            {category}
          </Badge>
        </div>

        <CardCeparatorBorder />
        <CardBetween left='Created' right={formateDate(createdAt)} />

        <div className='flex items-center gap-x-2 mt-0 mb-4 bg'>
          <input
            type="checkbox"
            id={`toggleId-${_id}`}  // Unique id for each checkbox
            className='w-4 h-4'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor={`toggleId-${_id}`} >  {/* Matching the unique id */}
            {checked && _id ?
              <p className='relative mt-1 flex gap-2 items-center cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(_id)
                  toast.success('Bot ID copied to clipboard', { duration: 2000 })
                }}
              >
                <span className='-mt-1'>{_id.slice(0, 13) + '...'}</span>
                <span className='flex items-center gap-2 hover:bg-slate-100 transition px-2 py-1'>
                  <CopyIcon className='cursor-pointer w-3 h-3' />
                  {/* <span className='text-[12px]'>COPY BOT ID</span> */}
                </span>
              </p> :
              <span className='my-2 text-[12px] cursor-pointer'>EXPOSE BOT ID</span>
              }
          </label>
        </div>
      </CardWrapper>
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        cb={() => deleteBot(_id)}
        title='Are you sure to delete this bot?'
      />
    </>
  )
}
