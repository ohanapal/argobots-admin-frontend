'use client'

import EmbeddingWidget from '@/components/reusable/common/embedding_widget'
import ReferrerSelector from '@/components/reusable/common/referrer_selector'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Button } from '@/components/ui/button'
import { BOT_URL } from '@/configs'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function EmbeddedWidgets() {
  const { watch } = useFormContext()
  const embedding_url = watch('embedding_url')
  const [referrer, setreferrer] = useState<string>('facebook')

  return (
    <>
      <FormWrapper>
        <SingleAccordion
          value='share-lin'
          label='Share links'
          hint='Copy the link from here for where you want to share your bot'
        >
          <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
            <ReferrerSelector referrer={referrer} setreferrer={setreferrer} />
            <Button
              variant='gradient'
              icon={<Copy />}
              onClick={() => {
                navigator.clipboard.writeText(`${BOT_URL}/${embedding_url}?referrer=${referrer}`)
                toast.success('Copied to clipboard')
              }}
            >
              Copy
            </Button>
          </div>
        </SingleAccordion>
      </FormWrapper>
      <FormWrapper>
        <SingleAccordion
          value='widget'
          label='Embeddable Widget'
          hint='Select the platform where you want to embed the AI chat assistant. Use the full-page widget code provided to integrate the chat assistant directly into your website or other compatible platforms, allowing users to interact seamlessly with the bot. For platforms like Facebook, Instagram, LinkedIn, and WhatsApp, where direct embedding might be restricted, you can use the provided URL to share the chat assistant as a link, redirecting users to the bot experience'
        >
          <EmbeddingWidget label='Full page widget' slug={embedding_url} size='full' />
          <EmbeddingWidget label='Small widget' slug={embedding_url} size='small' />
          <EmbeddingWidget
            label='Adform widget'
            slug={embedding_url}
            size='adform'
            note='Remember to replace the click tags and tracking scripts with those from your actual ads server'
          />
        </SingleAccordion>
      </FormWrapper>
    </>
  )
}
