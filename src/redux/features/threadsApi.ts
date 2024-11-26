import api from '../api'

const threadsApi = api.injectEndpoints({
  endpoints: build => ({
    getAllThread: build.query({
      query: params => ({
        url: '/threads/get-all',
        params
      }),
      providesTags: ['threads']
    }),
    getThread: build.mutation({
      query: thread_id => ({
        url: '/threads/get-thread',
        method: 'POST',
        body: { thread_id }
      }),
      invalidatesTags: ['thread']
    }),
    updateThread: build.mutation({
      query: body => ({
        url: '/threads/get-thread',
        method: 'POST',
        body
      }),
      invalidatesTags: ['thread']
    }),
    getThreadMessages: build.query({
      query: threadId => ({
        url: `/threads/messages/${threadId}`
      })
    }),
    genThreadSummary: build.mutation({
      query: text => ({
        url: '/threads/run-chat-completion',
        method: 'POST',
        body: { text }
      })
    })
  })
})

export const {
  useGetAllThreadQuery,
  useGetThreadMutation,
  useGetThreadMessagesQuery,
  useGenThreadSummaryMutation,
  useUpdateThreadMutation
} = threadsApi
