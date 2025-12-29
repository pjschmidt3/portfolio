'use client'

import * as React from 'react'
import { Experience, ExperienceItem } from '@/components/ui/experience'
import { MusicIcon, CrossIcon, CodeIcon, CloudIcon } from 'lucide-react'
import TrueCodersLogo from '@/public/images/TCFav.png'

interface TimelineProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

const WorkExperience = ({ className }: TimelineProps) => {
  const experienceItems: ExperienceItem[] = [
    {
      title: 'Lead Developer/Architect',
      details: 'Full-Time • Remote • Birmingham, AL',
      period: 'Apr 2021 - Aug 2024',
      company: 'TrueCoders',
      logo: TrueCodersLogo,
      description:
        'Led design and development of multiple large-scale React + Node.js web applications serving thousands of users. Managed CI/CD pipelines, deployments, monitoring, and production releases.'
    },
    {
      title: 'Web Developer/Consultant',
      details: 'Full-Time • Onsite • Birmingham, AL',
      period: '2020 - Apr 2021',
      company: 'Bailey Brothers Music Company',
      logo: <MusicIcon />,
      description:
        'Led a complete frontend redesign for a high-traffic Magento 2.4 e-commerce platform as the primary developer.'
    },
    {
      title: 'Senior Software Developer',
      details: 'Full-Time • Onsite • Birmingham, AL',
      period: 'Mar 2019 - Apr 2020',
      company: 'NaphCare',
      logo: <CrossIcon />,
      description:
        'Developed and maintained an existing healthcare application built with WinForms. \n Served as sole developer and architect for a secondary .NET MVC application from design \n'
        + 'through deployment.'
    },
    {
      title: 'Senior Software Developer',
      details: 'Full-Time • Onsite • Birmingham, AL',
      period: '2016-2019',
      company: 'Whiteboard-it',
      logo: <CodeIcon />,
      description:
        'Acted as lead developer within an 8–10 developer organization, primarily working in small teams and on solo projects. Built React and Vue based UIs while supporting backend services in Node.js and .NET.'
    },
    {
      title: 'Associate Consultant',
      details: 'Full-Time • Remote • Austin, TX',
      period: '2014-2015',
      company: 'VMWare',
      logo: <CloudIcon />,
      description:
        'Provided software development and technical consulting across multiple concurrent client engagements. Contributed to internal infrastructure and automation initiatives.'
    },
    {
      title: 'Associate Software Developer ',
      details: 'Full-Time • Onsite • Birmingham, AL',
      period: '2013-2014',
      company: 'Whiteboard-it',
      logo: <CodeIcon />,
      description:
        'Developed custom solutions for small to medium sized clients, often working as sole developer. Worked directly with clients to gather requirements and deliver full-stack solutions.'
    }
  ]

  return (
    <Experience
      className={className}
      experience={experienceItems}
    />
  )
}

export { WorkExperience }
