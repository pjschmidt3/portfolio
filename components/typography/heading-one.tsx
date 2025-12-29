import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface HeadingOneProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
}

export const HeadingOne = ({
  className,
  children,
  ...props
}: HeadingOneProps) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-bold text-primary-foreground font-inter',
        className
      )}
      {...props}>
      {children}
    </h1>
  )
}
