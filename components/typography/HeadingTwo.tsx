import { ReactNode } from 'react'

export interface HeadingTwoProps {
  children?: ReactNode
}

const HeadingTwo = ({ children }: HeadingTwoProps) => {
  return (
    <h2 className="scroll-m-20 text-4xl font-extrabold text-primary font-roboto">
      {children}
    </h2>
  )
}

export default HeadingTwo
