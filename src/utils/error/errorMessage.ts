import { AxiosError } from 'axios'

export const errorMessage = (error: Error): string => {
  if (error instanceof AxiosError) {
    console.error(error?.response?.data?.message)
    return error?.response?.data?.message || 'Something went wrong!'
  } else {
    console.error(error)
    return error?.message || 'Something went wrong!'
  }
}

export const rtkErrorMessage = (error: any): string => {
  console.error(error?.data?.message || error.message)
  return error?.data?.message || error.message || 'Something went wrong!'
}
