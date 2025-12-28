import HeadingTwo from '@/components/typography/HeadingTwo'
import { ReactNode } from 'react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import styles from './timeline.module.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export type TimelineEntry = {
  date: string
  title: string
  company?: string
  location?: string
  content: string | ReactNode
}

interface TimelineProps {
  className?: string
  heading?: string
  items: TimelineEntry[]
}

const Timeline = ({ className, heading, items }: TimelineProps) => {
  return (
    <section className={cn('bg-background py-16', className, styles.timeline)}>
      <div className="container">
        {heading && <HeadingTwo>{heading}</HeadingTwo>}
        {items.map((entry, index) => (
          <Card
            className="w-full mb-3"
            key={index}>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <CardDescription>
                {entry.company && <>{entry.company} | </>}
                {entry.location && <>{entry.location} | </>}
                {entry.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm font-montserrat">
              {entry.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { Timeline }
