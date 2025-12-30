'use client'

import { cn } from '@/lib/utils'
import { Heading } from '@/registry/new-york/ui/heading'
import { Paragraph } from '@/registry/new-york/ui/paragraph'
import type { Variants } from 'motion/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { isValidElement, ReactNode } from 'react'
import { motion } from 'motion/react'

export interface ExperienceItem {
  title: string
  details: string
  period: string
  company: string
  logo: StaticImport | ReactNode
  description: string
  className?: string
}

interface ExperienceProps {
  title?: string
  experience: ExperienceItem[]
  className?: string
}

const Experience = ({ experience, className }: ExperienceProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section className={cn('py-8', className)}>
      <motion.div
        variants={containerVariants}
        className="container"
        initial="hidden"
        animate="visible">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {experience.map(
              ({ title, details, period, company, logo, description }, idx) => (
                <div
                  key={idx}
                  className="border-b border-border pb-6 last:border-b-0">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="md:w-2/3">
                      <div className="mb-2 flex items-center gap-3">
                        {isValidElement(logo) ? (
                          logo
                        ) : (
                          <Image
                            height={50}
                            width={50}
                            src={logo as StaticImport}
                            alt={`${company} logo`}
                            className="h-5 object-contain"
                          />
                        )}
                        <Heading
                          level={3}
                          className="text-xl">
                          {title}
                        </Heading>
                      </div>
                      <Paragraph className="mb-3 text-sm text-muted-foreground">
                        {details}
                      </Paragraph>
                      <Paragraph className="text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </Paragraph>
                    </div>
                    <div className="text-right md:w-1/3 md:text-right">
                      <div className="mb-1 text-sm font-medium">{period}</div>
                      <div className="text-sm text-muted-foreground">
                        {company}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export { Experience }
