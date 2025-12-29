'use client'
import { PageContainer } from '@/components/layout/page-container'
import dynamic from 'next/dynamic'
const PdfViewer = dynamic(
  () => import('@/components/pdf/pdf-viewer').then((mod) => mod.PdfViewer),
  {
    ssr: false
  }
)

export default function Page() {
  return (
    <PageContainer
      pageId="resume"
      className="text-center">
      <PdfViewer />
    </PageContainer>
  )
}
