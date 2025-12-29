'use client'

import { Button } from '@/components/ui/button'
import { useScreenSize } from '@/hooks/useScreenSize'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `/vendor/pdf.worker.min.mjs`

export function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { width = 768 } = useScreenSize()

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  function handlePrevPageClicked() {
    setPageNumber(pageNumber - 1)
  }

  function handleNextPageClicked() {
    setPageNumber(pageNumber + 1)
  }

  return (
    <div>
      <div className="flex w-full justify-between mb-2">
        <div className="flex-1 text-right">
          <Button
            disabled={pageNumber === 1}
            onClick={handlePrevPageClicked}>
            <ChevronLeft />
          </Button>
        </div>
        <div className="text-center mx-5 leading-2rem">
          Page {pageNumber} of {numPages}
        </div>
        <div className="flex-1 text-left">
          <Button
            disabled={pageNumber === numPages}
            onClick={handleNextPageClicked}>
            <ChevronRight />
          </Button>
        </div>
      </div>

      <Document
        className="mx-auto"
        file="/Phillip_Schmidt_Senior_React_Developer.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas">
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={Math.max(width * 0.9, 390)}
        />
      </Document>
    </div>
  )
}
