import AllTemplates from '@/components/pages/admin/templates/AllTemplates'

export const metadata = {
  title: 'All Templates'
}
export default function AllTemplatesPage() {
  return (
    <>
      {/* <Tutorial
        videoId='qXgYQgCRqz8'
        title='Learn More'
        description='about the importance of having an AI chatbot'
        ctaLabel='Learn More'
        ctaHref='/'
        className='mb-10'
      /> */}
      <AllTemplates />
    </>
  )
}
