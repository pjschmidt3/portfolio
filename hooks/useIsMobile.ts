import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (window !== undefined) {
      const handleChange = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      const mediaQueries = window.matchMedia(
        `(max-width: ${breakpoint - 1})px)`
      )

      mediaQueries.addEventListener('change', handleChange)

      return () => {
        mediaQueries.removeEventListener('change', handleChange)
      }
    }
  }, [breakpoint])

  return isMobile
}
