'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Heading } from '@/registry/new-york/ui/heading'
import { Paragraph } from '@/registry/new-york/ui/paragraph'
import { SocialLinks, SocialsProps } from '@/registry/new-york/ui/social-links'
import { motion, type Variants } from 'motion/react'

export interface HeroProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  description?: string | ReactNode
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
  socialLinks?: SocialsProps
  className?: string
}

export function Hero({
  title,
  subtitle,
  description,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  socialLinks,
  className
}: HeroProps) {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <motion.div
      className={cn('flex-col space-y-5 text-center', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      {typeof title === 'string' ? (
        <motion.div variants={itemVariants}>
          <Heading
            level={1}
            className={cn('text-4xl md:text-6xl', titleClassName)}>
            {title}
          </Heading>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>{title}</motion.div>
      )}

      {subtitle
        && (typeof subtitle === 'string' ? (
          <motion.div variants={itemVariants}>
            <Heading
              level={2}
              className={cn('text-3xl md:text-4xl', subtitleClassName)}>
              {subtitle}
            </Heading>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>{subtitle}</motion.div>
        ))}

      {description
        && (typeof description === 'string' ? (
          <motion.div variants={itemVariants}>
            <Paragraph
              className={cn(
                'mb-16 mt-8 text-lg md:text-xl',
                descriptionClassName
              )}>
              {description}
            </Paragraph>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>{description}</motion.div>
        ))}

      {socialLinks && (
        <motion.div variants={itemVariants}>
          <SocialLinks
            className={cn('mx-auto w-full max-w-2/3', socialLinks.className)}
            size={socialLinks.size || '5xl'}
            {...socialLinks}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
