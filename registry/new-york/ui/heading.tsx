import { cn } from '@/lib/utils'
import { JSX, ReactNode } from 'react'

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5
  className?: string
  children?: ReactNode
}

export function Heading({ level, className, children }: HeadingProps) {
  const HeadingElement = `h${level}` as keyof JSX.IntrinsicElements
  const cssClasses = ['scroll-m-20', 'text-primary', 'font-roboto']
  switch (level) {
    case 1:
      cssClasses.push('text-4xl', 'font-bold')
      break
    case 2:
      cssClasses.push('text-2xl', 'font-medium')
      break
    case 3:
      cssClasses.push('text-xl', 'font-medium')
      break
    case 4:
      cssClasses.push('text-lg', 'font-medium')
      break
    case 5:
      cssClasses.push('text-md', 'font-medium')
      break
  }

  return (
    <HeadingElement className={cn(...cssClasses, className)}>
      {children}
    </HeadingElement>
  )
}
