import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface PageContainerProps {
  pageId?: string
  children: ReactNode
  className?: string
}

export function PageContainer({
  pageId,
  children,
  className
}: PageContainerProps) {
  return (
    <div
      className={cn(
        pageId || '',
        'page pt-8 px-6 md:px-12 space-y-8',
        className
      )}>
      {children}
    </div>
  )
}
