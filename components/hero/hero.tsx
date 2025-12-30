import { Hero as HeroComponent } from '@/registry/new-york/ui/hero'

const Hero = () => {
  return (
    <HeroComponent
      title="Hi, I'm Phillip Schmidt."
      subtitle="Full-stack software engineer. Problem Solver."
      description="I specialize in building modern web apps with React and Node.js (or Next.js)."
      socialLinks={{
        facebook: 'https://facebook.com/pjschmidt3',
        github: 'https://github.com/pjschmidt3',
        linkedIn: 'https://linkedin.com/in/pjschmidt3',
        x: 'https://x.com/pjschmidt3'
      }}
    />
  )
}

export default Hero
