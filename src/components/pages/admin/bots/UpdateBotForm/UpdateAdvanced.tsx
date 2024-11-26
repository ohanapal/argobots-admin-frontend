'use client'

import { Input } from '@/components/reusable/form/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/reusable/form/select'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { Textarea } from '@/components/reusable/form/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { formattingOrStructures, frameworkOrModels, toneAndStyles } from '@/constants/bot'
import { useFormContext } from 'react-hook-form'

interface Props {
  language: 'en' | 'ar'
  // eslint-disable-next-line no-unused-vars
  setlanguage: (language: 'en' | 'ar') => void
}

export default function UpdateAdvanced({ language, setlanguage }: Props) {
  const { watch, setValue } = useFormContext()
  const autoplayResponse = watch('autoplay_response')
  const showStartButton = watch('show_start')
  return (
    <SingleAccordion value='advanced' label='Advanced'>
      <div className='mb-4'>
        <Label className='text-text-gray mb-2 inline-block'>Output should be in:</Label>
        <div className='flex items-center gap-x-3'>
          <p>English</p>
          <Switch checked={language === 'ar'} onCheckedChange={e => setlanguage(e ? 'ar' : 'en')} />
          <p>Arabic</p>
        </div>
      </div>

      <div className='mb-4'>
        <Label className='text-text-gray mb-2 flex items-center gap-x-2'>
          Autoplay Response
          <Switch checked={autoplayResponse} onCheckedChange={e => setValue('autoplay_response', e)} />
        </Label>
      </div>

      <div className='mb-4'>
        <Label className='text-text-gray mb-2 flex items-center gap-x-2'>
          Show Start Button
          <Switch checked={showStartButton} onCheckedChange={e => setValue('show_start', e)} />
        </Label>
      </div>

      <Input
        name='sounds_like'
        label='Sounds like'
        hint='Describe the tone or personality you want this AI to emulate. This could be a specific person, brand, or style to help convey the intended voice.'
        placeholder='E.g., Jeff Bezos, CEO of Amazon'
      />
      <Textarea
        name='context'
        label='Context'
        placeholder='Type Context here...'
        rows={4}
        hint="Provide any relevant background information or setting that will guide the AI's responses. This helps the AI understand the scenario or audience."
      />
      <Select name='tone_and_style' label='Tone & Style'>
        <SelectTrigger>
          <SelectValue placeholder='Tone And Style' />
        </SelectTrigger>
        <SelectContent>
          {toneAndStyles.map(val => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name='framework' label='Frame or Model (if applicable)'>
        <SelectTrigger>
          <SelectValue placeholder='Frame or Model' />
        </SelectTrigger>
        <SelectContent>
          {frameworkOrModels?.map(val => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name='format' label='Formatting or Structure'>
        <SelectTrigger>
          <SelectValue placeholder='Formatting or Structure' />
        </SelectTrigger>
        <SelectContent>
          {formattingOrStructures?.map(val => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        name='objective'
        label='Objective'
        placeholder='Type Objective here...'
        rows={4}
        hint='Describe the main goal or purpose you want this AI to achieve. Clearly state the desired outcome for your audience or project.'
      />
      <Textarea
        name='target_audience'
        label='Target Audience'
        placeholder='Write about Target Audience here...'
        rows={5}
        hint='Define who this content is intended for. Consider demographics, interests, and any specific audience needs.'
      />
      <Textarea
        name='call_to_action'
        label='Call To Action'
        placeholder='Write about Call to Action here...'
        rows={5}
        hint='What action do you want the audience to take after engaging with this content? Specify your CTA to guide them.'
      />
    </SingleAccordion>
  )
}
