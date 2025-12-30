import { useEffect, useState } from 'react'

export function useScreenSize() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const hasWindow = typeof window !== 'undefined'

    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : 768
      const height = hasWindow ? window.innerHeight : 0
      return {
        width,
        height
      }
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    if (hasWindow) {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowDimensions
}
