'use client'

import { Heading } from '@/registry/new-york/ui/heading'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle
} from '@/components/ui/item'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'
import { ReactNode } from 'react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import TrueCodersLogoBanner from '@/public/images/truecoders-logo-banner.webp'
import TrueCodersLogo from '@/public/images/TrueCodersLogo.svg'
import { FaGithub } from 'react-icons/fa6'
import { ExternalLink } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

export type ProjectItem = {
  title: string
  description: string | ReactNode
  technologies: string[]
  image: string | StaticImport
  link?: string
  imageAlt?: string
  github: string
  demo?: string
}

interface ProjectsProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  heading?: string
}

export function Projects({ className }: ProjectsProps) {
  const projectItems: ProjectItem[] = [
    {
      title: 'TrueCoders Student Portal',
      description:
        'Comprehensive web platform allowing students to access course content, including lessons, exercises, quizzes, and videos. Built with React and Node.js.',
      technologies: [
        'React',
        'Node.js',
        'Express',
        'Mysql/MariaDB',
        'Auth0',
        'Socket.io',
        'Tanstack/react-query',
        'AWS'
      ],
      image: TrueCodersLogoBanner,
      github: 'http://github.com/pjschmidt3/portal.truecoders.io'
    },
    {
      title: 'TrueCoders Marketing Site',
      description:
        'Public marketing/sales website for TrueCoders, built with React and NextJS.',
      image: TrueCodersLogo,
      technologies: [
        'React.js',
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'Stripe',
        'PostgreSQL',
        'Vercel'
      ],
      github: 'http://github.com/pjschmidt3/truecoders.io',
      demo: 'https://truecoders.io'
    }
  ]

  const containerVariants: Variants = {
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
    <motion.section
      className={cn('bg-background my-16', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <Heading level={2}>Projects</Heading>
      <Carousel className="w-full">
        <CarouselContent>
          {projectItems.map((project, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2">
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>{project.title}</ItemTitle>
                  <ItemDescription className="min-h-20">
                    {project.description}
                  </ItemDescription>
                </ItemContent>
                <ItemFooter>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          data-role="tech"
                          key={techIndex}
                          className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </ItemFooter>
                <ItemActions className="w-full">
                  <ButtonGroup>
                    <Button>
                      <Link
                        href={project.github}
                        className="inline-flex items-center gap-2">
                        <FaGithub
                          className="size-4"
                          aria-hidden="true"
                        />
                        View on Github
                      </Link>
                    </Button>
                    <ButtonGroupSeparator />
                    {project.demo && (
                      <Button>
                        <Link
                          href={project.demo}
                          className="inline-flex items-center gap-2">
                          <ExternalLink
                            className="size-4"
                            aria-hidden="true"
                          />
                          View Site
                        </Link>
                      </Button>
                    )}
                  </ButtonGroup>
                </ItemActions>
              </Item>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.section>
  )
}
