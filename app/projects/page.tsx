import { Projects } from '@/components/projects/projects'
import { PageContainer } from '@/components/layout/page-container'
import { PageHeading } from '@/components/typography/page-heading'

export default function Page() {
  return (
    <PageContainer className="flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <PageHeading className="mb-8 text-center">Projects</PageHeading>
        <Projects />
      </div>
    </PageContainer>
  )
}
