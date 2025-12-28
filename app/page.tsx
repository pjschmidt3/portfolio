import { Timeline, TimelineEntry } from '@/components/timeline'
import HeadingOne from '@/components/typography/HeadingOne'
import Paragraph from '@/components/typography/Paragraph'
import { ScrollArea } from '@/components/ui/scroll-area'
import HeadingTwo from '@/components/typography/HeadingTwo'
import Image from 'next/image'
import styles from './page.module.css'

const experienceItems: TimelineEntry[] = [
  {
    date: 'Aug 2024 - Present',
    location: 'Covington, LA',
    title: 'Career Break — Relocation & Family Care',
    content: (
      <>
        <ul>
          <li>
            Temporarily stepped away from full-time employment to relocate and
            support an immediate family member following a bereavement.{' '}
          </li>
          <li>
            Kept skills current through continued learning and following
            developments in the React ecosystem.
          </li>
        </ul>
      </>
    )
  },
  {
    date: 'Apr 2021 – Aug 2024',
    company: 'TrueCoders',
    location: 'Covington, LA',
    title: 'Lead Developer / Architect',
    content: (
      <ul>
        <li>
          Architected and led development of a large-scale React + Node.js web
          application serving thousands of users.{' '}
        </li>
        <li>
          Designed reusable React components using hooks, Context API, and
          modern component-based design patterns.{' '}
        </li>
        <li>
          Managed CI/CD pipelines, deployments, monitoring, and production
          releases.
        </li>
        <li>
          Mentored junior developers in React, TypeScript, Node.js, and frontend
          best practices.
        </li>
      </ul>
    )
  },
  {
    title: 'Web Developer / Consultant',
    company: 'Bailey Brothers Music Company',
    location: 'Birmingham, AL',
    date: '2020 - Apr 2021',
    content: (
      <ul>
        <li>
          Led a complete frontend redesign for a high-traffic Magento 2.4
          e-commerce platform as the primary developer.
        </li>
        <li>
          Integrated third-party RESTful APIs for payments, shipping, and
          analytics.
        </li>
        <li>
          Reduced page load times by 80%+ through frontend and caching
          optimizations.
        </li>
      </ul>
    )
  }
]

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="flex w-full justify-between">
          <div className="flex-1 lg:sticky lg:top-0 lg:max-h-screen p-24">
            <HeadingOne>Phillip Schmidt</HeadingOne>
            <HeadingTwo>Senior Software Developer</HeadingTwo>
          </div>

          <div className="flex-1 p-24">
            <Paragraph>
              Senior React Developer with 10+ years of experience building
              scalable, maintainable web applications. Strong expertise in
              React, TypeScript, and frontend architecture, with a proven
              ability to translate complex technical and business requirements
              into clean, efficient, and user-focused solutions.
            </Paragraph>

            <Timeline heading="Experience" items={experienceItems} />
          </div>
        </div>
      </main>
    </div>
  )
}
