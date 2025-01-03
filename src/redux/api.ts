/* eslint-disable no-extra-semi */
import { API_URL } from '@/configs'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { getToken } from '@/utils/auth/getToken'
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import toast from 'react-hot-toast'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL
})

const baseQueryWithReauth = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  args.headers = {
    ...args.headers,
    Authorization: `Bearer ${getToken()}`
  }

  const refreshToken = getCookie('refreshToken')
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await axios.post(`${API_URL}/auth/login`, { refreshToken, type: 'refresh' })

    if (refreshResult?.data) {
      const newAccessToken = refreshResult?.data?.user?.accessToken
      const accessTokenExpiration = calculateTokenExpiration(newAccessToken)
      setCookie('accessToken', newAccessToken, {
        maxAge: accessTokenExpiration
      })
      if (args.headers) {
        ;(args.headers as Record<string, string>)['Authorization'] = `Bearer ${newAccessToken}`
      }
      result = await baseQuery(args, api, extraOptions)
    } else {
      toast.error('Please login again!')
    }
  }

  return result
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'user',
    'users',
    'companies',
    'company',
    'bots',
    'bot',
    'packages',
    'package',
    'categories',
    'category',
    'faqs',
    'faq',
    'knowledgeBases',
    'botLink',
    'botLinks',
    'templates',
    'template',
    'botImages',
    'thread',
    'threads'
  ],
  endpoints: () => ({})
})

export default api
