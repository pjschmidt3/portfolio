'use client'

import { Button } from '@/components/ui/button'
import { useScreenSize } from '@/hooks/useScreenSize'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
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

  // Calculate responsive width - ensure it's large enough
  const pdfWidth = Math.max(width * 0.9, 600)

  return (
    <div className="w-full mx-auto px-4">
      <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 mb-6 max-w-[1200px] mx-auto">
        <a
          href="/Phillip_Schmidt_Senior_React_Developer.pdf"
          download="Phillip_Schmidt_Senior_React_Developer.pdf"
          className="order-3 md:order-1"
        >
          <Button
            size="lg"
            variant="default"
          >
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
        </a>

        <div className="flex items-center gap-4 order-1 md:order-2">
          <Button
            disabled={pageNumber === 1}
            onClick={handlePrevPageClicked}
            size="lg"
            variant="outline"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-center font-medium text-lg whitespace-nowrap px-4">
            Page {pageNumber} of {numPages}
          </div>
          <Button
            disabled={pageNumber === numPages}
            onClick={handleNextPageClicked}
            size="lg"
            variant="outline"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="order-2 md:order-3 w-[140px]"></div>
      </div>

      <Document
        className="mx-auto shadow-lg"
        file="/Phillip_Schmidt_Senior_React_Developer.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas">
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={pdfWidth}
        />
      </Document>
    </div>
  )
}
