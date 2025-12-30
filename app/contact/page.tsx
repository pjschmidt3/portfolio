import dynamic from 'next/dynamic'
import { PageContainer } from '@/components/layout/page-container'
import { PageHeading } from '@/components/typography/page-heading'

const ContactForm = dynamic(() => import('@/components/contact/contact-form'), {
  loading: () => (
    <div className="w-full shadow-lg rounded-lg border p-6 animate-pulse">
      <div className="space-y-6">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-32 bg-muted rounded" />
      </div>
    </div>
  )
})

export default function Page() {
  return (
    <PageContainer className="flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <PageHeading className="mb-8 text-center">Contact Me</PageHeading>
        <ContactForm />
      </div>
    </PageContainer>
  )
}
