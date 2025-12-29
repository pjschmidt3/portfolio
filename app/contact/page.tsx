import ContactForm from '@/components/contact/contact-form'
import { PageContainer } from '@/components/layout/page-container'
import { PageHeading } from '@/components/typography/page-heading'

export default function Page() {
  return (
    <PageContainer>
      <PageHeading>Contact Me</PageHeading>
      <ContactForm />
    </PageContainer>
  )
}
