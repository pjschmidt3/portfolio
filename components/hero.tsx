import { HeadingOne } from '@/components/typography/heading-one'
import { HeadingTwo } from '@/components/typography/heading-two'
import { Paragraph } from '@/components/typography/paragraph'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

const Hero = () => {
  return (
    <div className="text-center flex-col space-y-5">
      <HeadingOne className="text-4xl md:text-6xl">
        Hi, I'm Phillip Schmidt.
      </HeadingOne>
      <HeadingTwo className="text-3xl md:text-4xl">
        Full-stack software engineer. Problem Solver.
      </HeadingTwo>
      <Paragraph className="text-lg md:text-xl mt-8 mb-16">
        I specialize in building modern web apps with React and Node.js (or
        Next.js).
      </Paragraph>

      <div className="inline-flex space-x-8">
        <Link href="https://github.com/pjschmidt3">
          <FaGithub size={36} />
        </Link>
        <Link href="https://www.linkedin.com/in/pjschmidt3">
          <FaLinkedin size={36} />
        </Link>
        <Link href="https://x.com/pjschmidt3">
          <FaXTwitter size={36} />
        </Link>
      </div>
    </div>
  )
}

export default Hero
