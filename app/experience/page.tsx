import { WorkExperience } from '@/components/experience/work-experience'
import { PageContainer } from '@/components/layout/page-container'
import { PageHeading } from '@/components/typography/page-heading'

export default function Page() {
  return (
    <PageContainer>
      <PageHeading>Experience</PageHeading>
      <WorkExperience />
    </PageContainer>
  )
}
