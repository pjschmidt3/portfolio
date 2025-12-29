import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface HeadingTwoProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
  className?: string
}

export const HeadingTwo = ({
  children,
  className,
  ...props
}: HeadingTwoProps) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-2xl font-medium text-primary-foreground font-inter',
        className
      )}
      {...props}>
      {children}
    </h2>
  )
}
