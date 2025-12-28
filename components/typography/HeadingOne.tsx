import { ReactNode } from 'react'

export interface HeadingOneProps {
  children?: ReactNode
}

const HeadingOne = ({ children }: HeadingOneProps) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold text-primary font-roboto">
      {children}
    </h1>
  )
}

export default HeadingOne
