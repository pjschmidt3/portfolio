import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
  children?: ReactNode
}

export const Paragraph = ({
  className,
  children,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cn('text-base font-mono', className)}
      {...props}>
      {children}
    </p>
  )
}
