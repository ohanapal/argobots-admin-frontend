'use client'

import ChatPreview from '@/components/pages/admin/bots/common/ChatPreview'
import Advanced from '@/components/pages/admin/bots/CreateBotForm/Advanced'
import Appearance from '@/components/pages/admin/bots/CreateBotForm/Appearance'
import LLMSettings from '@/components/pages/admin/bots/CreateBotForm/LLMSettings'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { getCompanyId } from '@/helpers/pages/companies'
import usePush from '@/hooks/usePush'
import { useCreateBotMutation } from '@/redux/features/botsApi'
import { useGetCompanyQuery } from '@/redux/features/companiesApi'
import { useGetTemplateQuery } from '@/redux/features/templatesApi'
import { IBot } from '@/types/IBot'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { ArrowRight, SquareDashedMousePointer } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import General from './General'

export default function CreateCompanyBotForm() {
  const push = usePush()
  const params = useSearchParams()
  const methods = useForm<IBot>()
  const { handleSubmit, reset } = methods

  const [category, setcategory] = useState<string | undefined>(undefined)
  const [language, setlanguage] = useState<'en' | 'ar'>('en')

  const [templateId, settemplateId] = useState<string | undefined>(undefined)
  const [skip, setskip] = useState<boolean>(true)
  const { data: templateData, isSuccess: isTemplateSuccess } = useGetTemplateQuery(templateId, { skip })

  useEffect(() => {
    if (params.has('template')) {
      settemplateId(params.get('template') as string)
      setskip(false)
    }
  }, [params])

  useEffect(() => {
    if (isTemplateSuccess) {
      // eslint-disable-next-line no-unused-vars
      const { _id, name, ...withoutId } = { ...templateData?.template }
      reset(withoutId)
      setlanguage(templateData?.template?.language)
    }
  }, [templateData, isTemplateSuccess, reset])

  const [createBot, { isLoading, isSuccess, isError, error, data }] = useCreateBotMutation()

  const { data: companyData } = useGetCompanyQuery(getCompanyId())

  const onSubmit = (data: IBot) => {
    if (!category) return toast.error('Please select a category!')
    createBot({ ...data, category, company_id: getCompanyId() })
  }

  const discardChanges = () => {
    reset()
    push('/company/bots')
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot created successfully')
      push(`/company/bots/update/${data?.bot?._id}?from=creation`)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Add an Assistant'
        extra={
          <>
            <Button variant='destructive' onClick={discardChanges}>
              Discard
            </Button>
            <LLink href='/company/bots/choose-template'>
              <Button variant='gradient' icon={<SquareDashedMousePointer />}>
                {templateId ? 'Choose another Template' : 'Choose Template'}
              </Button>
            </LLink>
            <Button
              variant='gradient'
              icon={<ArrowRight />}
              iconPosition='right'
              type='submit'
              isLoading={isLoading}
              disabled={!companyData?.data?.payment_status}
            >
              {companyData?.data?.payment_status ? 'Proceed to Knowledgebase' : 'Subscribe First'}
            </Button>
          </>
        }
      />

      <div className='flex flex-col md:flex-row gap-x-5 relative gap-y-10'>
        <FormWrapper className='w-full md:w-1/2 order-2 md:order-1'>
          <General category={category} setcategory={setcategory} />
          <Appearance />
          <LLMSettings />
          <Advanced language={language} setlanguage={setlanguage} />
        </FormWrapper>
        <div className='w-full md:w-1/2 relative md:sticky right-0 top-0 md:top-20 scroll-pt-24 h-auto md:h-screen order-1 md:order-2 overflow-y-auto'>
          <ChatPreview />
        </div>
      </div>
    </Form>
  )
}