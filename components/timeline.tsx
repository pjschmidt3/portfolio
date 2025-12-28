import { ReactNode } from 'react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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
    <section className={cn('bg-background py-32', className)}>
      <div className="container">
        {heading && (
          <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
            {heading}
          </h1>
        )}
        {items.map((entry, index) => (
          <Card className="w-full mb-3" key={index}>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <CardDescription>
                {entry.company && <>{entry.company} | </>}
                {entry.location && <>{entry.location} | </>}
                {entry.date}
              </CardDescription>
            </CardHeader>
            <CardContent>{entry.content}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { Timeline }
