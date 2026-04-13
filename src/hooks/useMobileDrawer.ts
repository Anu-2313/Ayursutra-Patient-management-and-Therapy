import { useState, useEffect, useCallback } from 'react'

export function useMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  // Lock/unlock body scroll when drawer opens/closes
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, toggle, close }
}

export default useMobileDrawer
