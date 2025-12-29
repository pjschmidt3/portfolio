'use client'

import { useEffect, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'

export function ScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>('')

  const scrollSpySections = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }
  ]

  useEffect(() => {
    const observers = scrollSpySections.map(({ id }) => {
      const element = document.querySelector(`#${id}`)
      if (!element) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -80% 0px',
          threshold: 0
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [scrollSpySections])

  return (
    <nav>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex items-start">
          {scrollSpySections.map(({ id, label }) => (
            <NavigationMenuItem key={id}>
              <NavigationMenuLink
                id={`nav-${id}`}
                href={`#${id}`}
                data-active={activeSection === id}
                className={activeSection === id ? 'text-highlight' : ''}>
                {label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
