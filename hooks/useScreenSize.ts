import { useEffect, useState } from 'react'

export function useScreenSize() {
  const getWindowDimensions = () => {
    const hasWindow = typeof window !== 'undefined'
    const width = hasWindow ? window.innerWidth : 768
    const height = hasWindow ? window.innerHeight : 0
    return {
      width,
      height
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
