'use client'

import EmbeddingWidget from '@/components/reusable/common/embedding_widget'
import ReferrerSelector from '@/components/reusable/common/referrer_selector'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function EmbeddedWidgets() {
  const { watch } = useFormContext()
  const embedding_url = watch('embedding_url')
  const [referrer, setreferrer] = useState<string | undefined>(undefined)

  return (
    <FormWrapper>
      <SingleAccordion
        value='widget'
        label='Embeddable Widget'
        hint='Select the platform where you want to embed the AI chat assistant. Use the full-page widget code provided to integrate the chat assistant directly into your website or other compatible platforms, allowing users to interact seamlessly with the bot. For platforms like Facebook, Instagram, LinkedIn, and WhatsApp, where direct embedding might be restricted, you can use the provided URL to share the chat assistant as a link, redirecting users to the bot experience'
      >
        <ReferrerSelector referrer={referrer} setreferrer={setreferrer} />
        <EmbeddingWidget label='Full page widget' slug={embedding_url} referrer={referrer} />
        <EmbeddingWidget label='Small widget' slug={embedding_url} isPopup referrer={referrer} />
      </SingleAccordion>
    </FormWrapper>
  )
}
