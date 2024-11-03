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
      <SingleAccordion value='widget' label='Embeddable Widget'>
        <ReferrerSelector referrer={referrer} setreferrer={setreferrer} />
        <EmbeddingWidget label='Full page widget' slug={embedding_url} referrer={referrer} />
        <EmbeddingWidget label='Small widget' slug={embedding_url} isPopup referrer={referrer} />
      </SingleAccordion>
    </FormWrapper>
  )
}
