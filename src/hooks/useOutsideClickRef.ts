import { useEffect, useRef } from 'react'

export default function useOutsideClickRef<T extends HTMLElement>(
  callback: () => void,
): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('touchend', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('touchend', handleClickOutside)
    }
  }, [callback])

  return ref
}
