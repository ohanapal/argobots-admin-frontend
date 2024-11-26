'use client'

import DnDUpload from '@/components/reusable/form/dnd-upload'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import SelectedColorPalette from '@/components/reusable/SelectedColorPalette'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { colorPalettes } from '@/constants/bot/color_palletes'
import { Palette, Video, X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import ReactPlayer from 'react-player'

export function Pallete({ keyValue, color }) {
  const formatLabel = key => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  }
  return (
    <div
      className='flex flex-col items-center justify-center px-1 py-2.5 w-1/3 text-[10px] font-bold'
      style={{
        background: keyValue === 'gradient' ? `radial-gradient(${color[0]}, ${color[1]})` : color
      }}
    >
      <p className='[text-shadow:_1px_1px_4px_rgb(255_255_255_/_100%)] bg-white/40 px-1 rounded-sm'>
        {formatLabel(keyValue)}
      </p>
    </div>
  )
}

export default function UpdateAppearance() {
  const { watch, setValue } = useFormContext()
  const logoVal = watch('logo_light')
  const darkLogoVal = watch('logo_dark')

  const botLogoVal = watch('bot_logo')
  const userLogoVal = watch('user_logo')

  const coverImageVal = watch('cover_image')

  // const bgLightVal = watch('bg_light')
  // const bgDarkVal = watch('bg_dark')

  // const nameVal = watch('name')

  const coverVideoURL = watch('cover_video_url')

  const selectedPalette = watch('color_palette')

  const handlePaletteSelect = palette => {
    setValue('color_palette', { ...palette })
  }

  return (
    <SingleAccordion value='appearance' label='Appearance'>
      <Input name='name' label='Assistant Name' placeholder='Assistant name here...' required />
      <Input
        name='embedding_url'
        label='Embedding URL Slug'
        placeholder='product-tour'
        required
        hint="This is the unique identifier for the embedded content on your site. It will be part of the URL for the embed, making it easier for users to access and share. Choose a simple and relevant slug for better visibility and SEO, like 'product-tour' or 'demo-video'."
      />

      <Label className='mt-4 mb-2 inline-block text-lg'>Logo and Backgrounds</Label>
      <div className='grid grid-cols-1 min-[450px]:grid-cols-2 min-[1400px]:grid-cols-3 gap-x-2'>
        {logoVal ? (
          <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo_light', '')} aspect='square' />
        ) : (
          <DnDUpload
            name='logo_light'
            text='Light Mode Logo*'
            required
            description='(300 x 300)'
            className='p-2 sm:p-5'
            accept='image/*'
          />
        )}

        {darkLogoVal ? (
          <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('logo_dark', '')} aspect='square' />
        ) : (
          <DnDUpload
            name='logo_dark'
            text='Dark Mode Logo'
            description='(300 x 300)'
            className='p-2 sm:p-5'
            accept='image/*'
          />
        )}
        {botLogoVal ? (
          <ImagePreviewer imgSrc={botLogoVal} onClick={() => setValue('bot_logo', '')} aspect='square' />
        ) : (
          <DnDUpload
            name='bot_logo'
            text='Bot Logo*'
            required
            description='(48 x 48)'
            className='p-2 sm:p-5'
            accept='image/*'
          />
        )}

        {userLogoVal ? (
          <ImagePreviewer imgSrc={userLogoVal} onClick={() => setValue('user_logo', '')} aspect='square' />
        ) : (
          <DnDUpload
            name='user_logo'
            text='User Logo*'
            required
            description='(48 x 48)'
            className='p-2 sm:p-5'
            accept='image/*'
          />
        )}
        {/* {bgLightVal ? (
          <ImagePreviewer imgSrc={bgLightVal} onClick={() => setValue('bg_light', '')} />
        ) : (
          <DnDUpload
            name='bg_light'
            text='Background Image(Light)'
            description='(1920 x 1080)'
            className='p-2 sm:p-5'
          />
        )}

        {bgDarkVal ? (
          <ImagePreviewer imgSrc={bgDarkVal} onClick={() => setValue('bg_dark', '')} />
        ) : (
          <DnDUpload name='bg_dark' text='Background Image(Dark)' description='(1920 x 1080)' className='p-2 sm:p-5' />
        )} */}
      </div>

      <Label className='mt-4 mb-2 inline-block text-lg'>Cover Image</Label>
      {coverImageVal ? (
        <ImagePreviewer imgSrc={coverImageVal} onClick={() => setValue('cover_image', '')} aspect='square' />
      ) : (
        <DnDUpload
          name='cover_image'
          text='Cover Image*'
          required
          description='(1080 x 1080)'
          className='p-2 sm:p-5'
          accept='image/*'
        />
      )}

      <Label className='mt-4 mb-2 inline-block text-lg'>Cover Video</Label>
      {coverVideoURL ? (
        <div className='w-full max-w-3xl m-auto relative'>
          <ReactPlayer url={coverVideoURL} width='100%' height='100%' controls />
          <X
            className='size-6 cursor-pointer p-1 bg-destructive text-white absolute top-2 right-2 rounded-full'
            strokeWidth={3}
            onClick={() => setValue('cover_video_url', '')}
          />
        </div>
      ) : (
        <DnDUpload
          name='cover_video_url'
          icon={Video}
          buttonLabel='Select a Video'
          text='Cover Video'
          description='Upload a short video'
          accept='video/*'
        />
      )}

      <div className='flex flex-col gap-y-2 mb-3'>
        <Label className='mt-4 mb-2 inline-block text-lg'>Color Palettes</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' icon={<Palette />} className='flex gap-y-1 items-center flex-wrap h-14'>
              <span className='mr-2 font-semibold'>Choose Color Palette</span>
              <SelectedColorPalette palette={selectedPalette} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {colorPalettes.map((palette, index) => (
              <DropdownMenuItem key={index} onClick={() => handlePaletteSelect(palette)}>
                <div className='flex flex-wrap max-w-md'>
                  {Object.entries(palette).map(([key, color]) => (
                    <Pallete key={key} keyValue={key} color={color} />
                  ))}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex flex-wrap max-w-full border rounded-lg overflow-hidden'>
        {selectedPalette &&
          Object.entries(selectedPalette).map(([key, color]) => <Pallete key={key} keyValue={key} color={color} />)}
      </div>

      {/* <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-2'>
        <ColorInput name='primary_color' label='Primary Color' required defaultValue='#9eb0ff' />
        <ColorInput name='secondary_color' label='Secondary Color' required defaultValue='#e1e1f9' />
        <ColorInput name='primary_font_color' label='Primary Font Color' required defaultValue='#000000' />
        <ColorInput name='secondary_font_color' label='Secondary Font Color' required defaultValue='#000000' />

        <ColorInput name='primary_color_dark' label='Primary Color (Dark)' required defaultValue='#9eb0ff' />
        <ColorInput name='secondary_color_dark' label='Secondary Color (Dark)' required defaultValue='#e1e1f9' />
        <ColorInput name='primary_font_color_dark' label='Primary Font Color (Dark)' required defaultValue='#000000' />
        <ColorInput
          name='secondary_font_color_dark'
          label='Secondary Font Color (Dark)'
          required
          defaultValue='#000000'
        />
        <ColorInput name='gradient' label='Gradient' required defaultValue='#9eb0ff' />
      </div> */}
    </SingleAccordion>
  )
}
