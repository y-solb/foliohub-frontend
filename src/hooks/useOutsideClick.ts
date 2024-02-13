import { useEffect, useRef, useState } from 'react'

export default function useOutsideClick(
  callback: () => void,
  defaultValue = false,
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<HTMLDivElement>,
] {
  const ref = useRef<HTMLDivElement>(null)
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
