'use client'

import { cn } from '@/lib/utils'
import { ComponentType } from 'react'
import {
  FaFacebook,
  FaYoutube,
  FaSquareInstagram,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaDiscord,
  FaTwitter
} from 'react-icons/fa6'
import { motion } from 'motion/react'

type fontSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'

export interface SocialsProps {
  facebook?: string
  youtube?: string
  instagram?: string
  github?: string
  linkedIn?: string
  twitter?: string
  x?: string
  discord?: string
  as?: ComponentType<{
    href?: string
  }>
  className?: string
  size?: fontSize
}

export function SocialLinks({
  facebook,
  youtube,
  instagram,
  github,
  linkedIn,
  twitter,
  x,
  discord,
  as,
  className,
  size = 'lg'
}: SocialsProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row justify-center space-x-12',
        className
      )}>
      {facebook && (
        <SocialLink
          size={size}
          type="facebook"
          url={facebook}
          as={as}
        />
      )}
      {youtube && (
        <SocialLink
          size={size}
          type="youtube"
          url={youtube}
          as={as}
        />
      )}
      {instagram && (
        <SocialLink
          size={size}
          type="instagram"
          url={instagram}
          as={as}
        />
      )}
      {github && (
        <SocialLink
          size={size}
          type="github"
          url={github}
          as={as}
        />
      )}
      {linkedIn && (
        <SocialLink
          size={size}
          type="linkedIn"
          url={linkedIn}
          as={as}
        />
      )}
      {twitter && (
        <SocialLink
          size={size}
          type="twitter"
          url={twitter}
          as={as}
        />
      )}
      {x && (
        <SocialLink
          size={size}
          type="x"
          url={x}
          as={as}
        />
      )}
      {discord && (
        <SocialLink
          size={size}
          type="discord"
          url={discord}
          as={as}
        />
      )}
    </div>
  )
}

type socialType =
  | 'facebook'
  | 'youtube'
  | 'instagram'
  | 'github'
  | 'linkedIn'
  | 'twitter'
  | 'x'
  | 'discord'

const socialTypeMap = {
  facebook: FaFacebook,
  youtube: FaYoutube,
  instagram: FaSquareInstagram,
  github: FaGithub,
  linkedIn: FaLinkedin,
  twitter: FaTwitter,
  x: FaXTwitter,
  discord: FaDiscord
}

interface SocialLinkProps {
  type: socialType
  as?: ComponentType<{
    href?: string
  }>
  url?: string
  size?: fontSize
}

export function SocialLink({ type, url, as, size, ...props }: SocialLinkProps) {
  const Icon = socialTypeMap[type]

  const LinkComponent = as || 'a'

  return (
    <LinkComponent href={url}>
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          {...props}
          className={`text-${size}`}
        />
      </motion.div>
    </LinkComponent>
  )
}
