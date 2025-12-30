'use client'

import { Heading } from '@/registry/new-york/ui/heading'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from '@/components/ui/item'
import { Progress } from '@/components/ui/progress'
import { cnFrom } from '@/lib/utils'
import { FaAws, FaDatabase, FaGit, FaNodeJs, FaReact } from 'react-icons/fa6'
import { RiNextjsFill } from 'react-icons/ri'
import { SiTailwindcss, SiTypescript } from 'react-icons/si'
import { motion, type Variants } from 'motion/react'

enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert'
}

const Skills = () => {
  const skills = [
    {
      title: 'React',
      icon: <FaReact className="text-4xl" />,
      skillLevel: SkillLevel.Expert
    },
    {
      title: 'Node.js',
      icon: <FaNodeJs className="text-4xl" />,
      skillLevel: SkillLevel.Expert
    },
    {
      title: 'Next.js',
      icon: <RiNextjsFill className="text-4xl" />,
      skillLevel: SkillLevel.Expert
    },
    {
      title: 'TypeScript',
      icon: <SiTypescript className="text-4xl" />,
      skillLevel: SkillLevel.Expert
    },
    {
      title: 'Tailwind CSS',
      icon: <SiTailwindcss className="text-4xl" />,
      skillLevel: SkillLevel.Advanced
    },
    {
      title: 'MongoDB/PostgreSQL',
      icon: <FaDatabase className="text-4xl" />,
      skillLevel: SkillLevel.Expert
    },
    {
      title: 'Git',
      icon: <FaGit className="text-4xl" />,
      skillLevel: SkillLevel.Expert
    },
    {
      title: 'AWS',
      icon: <FaAws className="text-4xl" />,
      skillLevel: SkillLevel.Intermediate
    }
  ]

  const skillLevelProgressMap = {
    [SkillLevel.Beginner]: 25,
    [SkillLevel.Intermediate]: 60,
    [SkillLevel.Advanced]: 80,
    [SkillLevel.Expert]: 100
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}>
      <motion.div variants={itemVariants}>
        <Heading
          level={2}
          className="text-center mb-5">
          Technical Skills
        </Heading>
      </motion.div>
      <motion.div variants={containerVariants}>
        <ItemGroup className="mx-auto grid grid-cols-1 gap-4 md:max-w-2/3 md:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}>
              <Item
                role="listitem"
                className="flex justify-between"
                variant="outline">
                <ItemMedia>{skill.icon}</ItemMedia>
                <ItemContent>
                  <ItemTitle>{skill.title}</ItemTitle>

                  <Progress
                    aria-label={`${skill.title} skill level`}
                    value={skillLevelProgressMap[skill.skillLevel]}
                  />
                </ItemContent>
                <ItemDescription
                  className={cnFrom({
                    'text-shadow-green-500':
                      skill.skillLevel === SkillLevel.Expert,
                    'text-slime-500': skill.skillLevel === SkillLevel.Advanced,
                    'text-shadow-yellow-500':
                      skill.skillLevel === SkillLevel.Intermediate,
                    'text-shadow-orange-500':
                      skill.skillLevel === SkillLevel.Beginner
                  })}>
                  {skill.skillLevel.toString()}
                </ItemDescription>
              </Item>
            </motion.div>
          ))}
        </ItemGroup>
      </motion.div>
    </motion.div>
  )
}

export default Skills
