import Hero from '@/components/hero/hero'
import { PageContainer } from '@/components/layout/page-container'
import Skills from '@/components/skills/skills'

export default function Home() {
  return (
    <PageContainer className="py-20">
      <Hero />
      <Skills />
    </PageContainer>
  )
}
