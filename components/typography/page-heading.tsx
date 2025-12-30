'use client'

import { Heading } from '@/registry/new-york/ui/heading'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface PageHeadingProps {
  className?: string
  children: ReactNode
}

const headingVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const MotionComponent = motion.create(Heading)

export function PageHeading({ className, children }: PageHeadingProps) {
  return (
    <MotionComponent
      variants={headingVariants}
      initial="hidden"
      animate="visible"
      level={1}
      className={cn('text-5xl', className)}>
      {children}
    </MotionComponent>
  )
}
