import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Heading } from '@/registry/new-york/ui/heading'
import { Paragraph } from '@/registry/new-york/ui/paragraph'
import { SocialLinks, SocialsProps } from '@/registry/new-york/ui/social-links'

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
  return (
    <div className={cn('flex-col space-y-5 text-center', className)}>
      <Heading
        level={1}
        className={cn('text-4xl md:text-6xl', titleClassName)}>
        {title}
      </Heading>
      <Heading
        level={2}
        className={cn('text-3xl md:text-4xl', subtitleClassName)}>
        {subtitle}
      </Heading>

      <Paragraph
        className={cn('mb-16 mt-8 text-lg md:text-xl', descriptionClassName)}>
        {description}
      </Paragraph>

      {socialLinks && (
        <SocialLinks
          className={cn('mx-auto w-full max-w-2/3', socialLinks.className)}
          size={socialLinks.size || '5xl'}
          {...socialLinks}
        />
      )}
    </div>
  )
}
