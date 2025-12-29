import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

export const Paragraph = ({
  className,
  children,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cn('leading-7 text-base', className)}
      {...props}>
      {children}
    </p>
  )
}
