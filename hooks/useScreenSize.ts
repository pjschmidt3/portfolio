import { useEffect, useState } from 'react'

export function useScreenSize() {
  const hasWindow = typeof window !== 'undefined'

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : 768
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  function handleResize() {
    setWindowDimensions(getWindowDimensions())
  }

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow, handleResize])

  return windowDimensions
}
