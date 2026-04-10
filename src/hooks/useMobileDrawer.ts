import { useState, useEffect } from 'react'

export function useMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  // Lock/unlock body scroll when drawer opens/closes
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      // Always restore on unmount
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function toggle() {
    setIsOpen(prev => !prev)
  }

  function close() {
    setIsOpen(false)
  }

  return { isOpen, toggle, close }
}

export default useMobileDrawer
