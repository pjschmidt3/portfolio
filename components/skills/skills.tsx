import { Heading } from '@/components/typography/heading'
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

  return (
    <div>
      <Heading
        level={2}
        className="text-center mb-5">
        Technical Skills
      </Heading>
      <ItemGroup className="flex flex-col md:flex-row md:justify-start md:items-center mx-auto md:max-w-2/3 flex-wrap">
        {skills.map((skill, index) => (
          <div className="w-full md:w-1/2 px-2 py-1">
            <Item
              className="flex justify-between"
              key={index}
              variant="outline">
              <ItemMedia>{skill.icon}</ItemMedia>
              <ItemContent>
                <ItemTitle>{skill.title}</ItemTitle>

                <Progress value={skillLevelProgressMap[skill.skillLevel]} />
              </ItemContent>
              <ItemDescription
                className={cnFrom({
                  'text-green-500': skill.skillLevel === SkillLevel.Expert,
                  'text-lime-500': skill.skillLevel === SkillLevel.Advanced,
                  'text-yellow-500':
                    skill.skillLevel === SkillLevel.Intermediate,
                  'text-orange-500': skill.skillLevel === SkillLevel.Beginner
                })}>
                {skill.skillLevel.toString()}
              </ItemDescription>
            </Item>
          </div>
        ))}
      </ItemGroup>
    </div>
  )
}

export default Skills
