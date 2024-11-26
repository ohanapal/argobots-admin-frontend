'use client'

import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Slider } from '@/components/reusable/form/slider'
import { Textarea } from '@/components/reusable/form/textarea'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export default function LLMSettings() {
  const { setValue } = useFormContext()
  useEffect(() => {
    setValue('max_token', 1000)
  }, [setValue])
  return (
    <SingleAccordion value='llm-settings' label='LLM Settings'>
      <Input
        name='welcome_message'
        label='Welcome Message'
        placeholder='Enter the welcome message here...'
        hint='Set the welcome message that users will see when they first interact with the model. This helps to create a friendly and engaging initial experience.'
      />
      <Input
        name='first_message'
        label='First Message'
        placeholder='Enter the first message here...'
        hint='Set the initial message that users will see when they interact with the model. This helps to guide the conversation and set expectations.'
      />
      <div className='flex items-center flex-col min-[450px]:flex-row gap-x-2 w-full'>
        <Slider
          name='temperature'
          label='Temperature'
          defaultValue={0.5 as unknown as number[]}
          containerClassName='w-full'
          min={0}
          max={2}
          step={0.1}
          hint='Adjusts the randomness of responses. Lower values make replies more focused; higher values make replies more creative.'
        />
        <Slider
          name='frequency_penalty'
          label='Frequency Penalty'
          defaultValue={0.5 as unknown as number[]}
          containerClassName='w-full'
          min={-2}
          max={2}
          step={0.1}
          hint='Controls repetition in responses. Higher values reduce repetition of commonly used words, encouraging more diverse language.'
        />
      </div>
      <div className='flex items-center flex-col min-[450px]:flex-row gap-x-2'>
        <Slider
          name='top_p'
          label='Top Presence'
          defaultValue={0.5 as unknown as number[]}
          containerClassName='w-full'
          min={0}
          max={1}
          step={0.1}
          hint='Sets the likelihood of choosing the most probable words. Lower values make responses more varied, while higher values focus on top choices.'
        />
        <Slider
          name='max_token'
          label='Max Tokens'
          defaultValue={1000 as unknown as number[]}
          containerClassName='w-full'
          min={0}
          max={2000}
          step={50}
          hint='Limits the maximum length of the response. Adjust based on how detailed you want the replies to be.'
        />
      </div>
      <Textarea
        name='description'
        label='Description'
        placeholder='Enter Description here...'
        hint='Provide a brief overview of the LLM settings and purpose for this configuration. This helps others understand the intent behind the settings'
      />
    </SingleAccordion>
  )
}
