'use client'

import PriceCard from '@/components/reusable/cards/price-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Checkbox } from '@/components/reusable/form/checkbox'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { botStorageRegex } from '@/configs/regex'
import usePush from '@/hooks/usePush'
import { useGetPackageQuery, useUpdatePackageMutation } from '@/redux/features/packagesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { frequencies } from './AllPackages'

export default function UdpatePackageForm() {
  const { id } = useParams()
  const push = usePush()
  const methods = useForm()
  const { handleSubmit, watch, reset, setValue } = methods

  const { data, isSuccess: isFetchingSuccess } = useGetPackageQuery(id as string)

  const name = watch('name')
  const description = watch('description')
  const hidden = watch('hidden')
  const monthly_price = watch('monthly_price')
  const yearly_price = watch('yearly_price')
  const priority_support = watch('priority_support')
  const embed_widgets = watch('embed_widget')
  const display_images = watch('display_images')
  const custom_domain = watch('custom_domain')
  const total_file_storage = watch('total_file_storage')
  const bot_limit = watch('bot_limit')

  useEffect(() => {
    if (isFetchingSuccess) {
      reset(data?.package)
      setValue('monthly_price', data?.package?.price?.monthly?.price)
      setValue('yearly_price', data?.package?.price?.yearly?.price)
      data?.package?.features?.map((feat: any) => {
        setValue(feat.keyword, feat.value)
      })
    }
  }, [data, reset, isFetchingSuccess, setValue])

  const packageDetails = {
    name,
    description,
    hidden,
    price: {
      monthly: {
        price: monthly_price,
        currency: 'USD'
      },
      yearly: {
        price: yearly_price,
        currency: 'USD'
      }
    },
    features: [
      {
        name: 'Embed Widget',
        keyword: 'embed_widget',
        type: 'Boolean',
        value: embed_widgets
      },
      {
        name: 'Display Images',
        keyword: 'display_images',
        type: 'Boolean',
        value: display_images
      },
      {
        name: 'Bot Limit',
        keyword: 'bot_limit',
        type: 'Number',
        value: bot_limit
      },
      {
        name: 'Total File Storage',
        keyword: 'total_file_storage',
        type: 'String',
        value: total_file_storage
      },
      {
        name: 'Custom Domain',
        keyword: 'custom_domain',
        type: 'Boolean',
        value: custom_domain
      },
      {
        name: 'Priority Support',
        keyword: 'priority_support',
        type: 'Boolean',
        value: priority_support
      }
    ]
  }

  const discardChanges = () => {
    reset()
    push('/admin/packages')
  }

  const [updatePkg, { isLoading, isSuccess, isError, error }] = useUpdatePackageMutation()

  const onsubmit = () => {
    const packageStorageLimit = packageDetails.features.find(pkg => pkg.keyword === 'total_file_storage')?.value
    const isValidStorageLimit = botStorageRegex.test(packageStorageLimit)

    if (!isValidStorageLimit) {
      toast.error('Use a valid Storage Limit like 500KB, 100MB, 1.5GB, etc!')
      return
    }
    updatePkg({ id, body: packageDetails })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Package updated successfully!')
      push('/admin/packages')
    }
    if (isError) {
      toast.error(rtkErrorMessage(error))
    }
  }, [isSuccess, isError, error, push])

  const [showYearly, setshowYearly] = useState<boolean>(false)

  return (
    <FormWrapper>
      <Form methods={methods} onSubmit={handleSubmit(onsubmit)}>
        <DashboardHeading
          title='Package Information'
          variant='h4'
          extra={
            <>
              <Button variant='black' onClick={discardChanges}>
                Discard
              </Button>
              <Button variant='gradient' icon={<PencilLine />} type='submit' isLoading={isLoading}>
                Udpate Package
              </Button>
            </>
          }
        />
        <div className='flex gap-x-6'>
          <div className='w-full'>
            <p className='text-xl font-medium mb-2 text-text-heading'>General</p>
            <Input name='name' placeholder='Package name' label='Package name' required />
            <Textarea
              name='description'
              placeholder='Write package description here'
              label='Package Description'
              required
              rows={4}
            />
            <Checkbox name='hidden' label='Hidden package' />

            <p className='text-xl font-medium mt-4 mb-2 text-text-heading'>Pricing</p>
            <Input
              name='monthly_price'
              placeholder='Enter monthly package price'
              label='Package Price (Monthly)'
              type='number'
              required
              step={5}
            />
            <Input
              name='yearly_price'
              placeholder='Enter yearly package price'
              label='Package Price (Yearly)'
              type='number'
              required
              step={5}
            />

            <p className='text-xl font-medium mt-4 mb-2 text-text-heading'>Features</p>
            <Checkbox name='priority_support' label='Priority Support' />
            <Checkbox name='embed_widget' label='Embed Widgets' />
            <Checkbox name='display_images' label='Display Images' />
            <Checkbox name='custom_domain' label='Custom Domain' />
            <Input name='total_file_storage' placeholder='Enter Storage Limit' label='Storage Limit' required />
            <Input name='bot_limit' placeholder='Enter Bot Limit' label='Bot Limit' required type='number' />
          </div>
          <div className='w-96'>
            <Checkbox
              checked={showYearly}
              onCheckedChange={e => setshowYearly(e as boolean)}
              label='Show yearly price?'
              id='show-yearly'
              containerClassName='mt-6'
            />
            <PriceCard
              tier={packageDetails}
              frequency={showYearly ? frequencies[1] : frequencies[0]}
              className='border-dashed'
            />
          </div>
        </div>
      </Form>
    </FormWrapper>
  )
}
