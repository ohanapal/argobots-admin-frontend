import { useEffect, useState } from 'react'

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    handleResize() // Initial call to set width correctly

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}

export default useWindowWidth
