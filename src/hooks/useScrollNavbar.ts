import { useState, useEffect } from 'react'

/**
 * Returns { isScrolled: true } when window.scrollY > threshold.
 * Uses a passive scroll listener for performance.
 */
export function useScrollNavbar(threshold = 20): { isScrolled: boolean } {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Set initial state in case page loads mid-scroll
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { isScrolled }
}

export default useScrollNavbar
