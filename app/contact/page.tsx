import ContactForm from '@/components/contact/contact-form'
import { PageContainer } from '@/components/layout/page-container'
import { PageHeading } from '@/components/typography/page-heading'

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
