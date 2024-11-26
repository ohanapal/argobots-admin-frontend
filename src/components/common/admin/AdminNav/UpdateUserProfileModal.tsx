'use client'

import avatar from '@/assets/images/common/avatar.png'
import animationData from '@/assets/lottie/imageUploading.json'
import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Img } from '@/components/ui/img'
import Overlay from '@/components/ui/overlay'
import { useUpdateProfileMutation } from '@/redux/features/usersApi'
import { IUser } from '@/types/IUser'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { uploadFile } from '@/utils/files/uploadFile'
import { ImageUp, UserCog2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  openModal: boolean
  setopenModal: Dispatch<SetStateAction<boolean>>
  user: IUser
}

export default function UpdateUserProfileModal({ openModal, setopenModal, user }: Props) {
  const { push } = useRouter()

  const [isUploading, setIsUploading] = useState(false)
  const inputBtnRef = useRef<HTMLInputElement | null>(null)

  const methods = useForm()
  const { handleSubmit, watch, reset, setValue } = methods

  useEffect(() => {
    reset(user)
  }, [reset, user])

  const imageVal = watch('image')

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const files = e.target.files
    if (files?.length) {
      uploadFileFn(files[0])
    }
  }

  const uploadFileFn = async (file: File) => {
    try {
      setIsUploading(true)
      const fileURL = await uploadFile(file)
      if (typeof fileURL === 'string') {
        setValue('image', fileURL, { shouldValidate: true, shouldDirty: true })
      } else if (fileURL.code === 'ERR_NETWORK') {
        toast.error('Network Error, try again!')
      } else {
        toast.error('Something went wrong, try again!')
      }
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    } catch (error) {
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    }
  }

  const [updateProfile, { isLoading: isUpdateLoading, isError, error, isSuccess: isUpdateSuccess }] =
    useUpdateProfileMutation()

  const onSubmit = (data: any) => {
    updateProfile(data)
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success('Profile updated successfully')
      setopenModal(false)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isUpdateSuccess, push, error, isError, setopenModal])

  return (
    <>
      <Dialog open={openModal} onOpenChange={setopenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <div className='inline-flex flex-col items-center justify-center gap-y-3'>
            {imageVal ? (
              <Img src={imageVal} alt={user?.name} className='size-28 object-cover border rounded-full' />
            ) : (
              <Img src={avatar} alt='User' className='size-28 object-cover border rounded-full' />
            )}

            <Button onClick={() => inputBtnRef.current.click()} icon={<ImageUp />} variant='outline' size='sm'>
              Update Image
            </Button>
          </div>
          <input type='file' ref={inputBtnRef} onChange={handleChange} className='hidden' accept='image/*' />

          <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='mt-10 max-w-md'>
            <Input name='name' label='Name' required placeholder='Your Fullname' />
            <Input name='birthdate' label='Birthdate' type='date' />
            <Button type='submit' variant='gradient' icon={<UserCog2 />} isLoading={isUpdateLoading}>
              Save profile
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
      <Overlay isOpen={isUploading} animationData={JSON.parse(JSON.stringify(animationData))} />
    </>
  )
}
