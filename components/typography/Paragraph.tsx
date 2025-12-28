import { ReactNode } from 'react'

export interface ParagraphProps {
  children?: ReactNode
}

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6 text-primary">
      {children}
    </p>
  )
}

export default Paragraph
