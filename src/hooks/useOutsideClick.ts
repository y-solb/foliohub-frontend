import { useEffect, useRef, useState } from 'react'

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  defaultValue = false,
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<T>,
] {
  const ref = useRef<T>(null)
  const [isOpen, setIsOpen] = useState(defaultValue)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        callback()
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, callback])

  return [isOpen, setIsOpen, ref]
}
