import { Heading } from '@/components/typography/heading'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface PageHeadingProps {
  className?: string
  children: ReactNode
}

export function PageHeading({ className, children }: PageHeadingProps) {
  return (
    <Heading
      level={1}
      className={cn('text-5xl', className)}>
      {children}
    </Heading>
  )
}
