import { useCallback, useRef } from 'react'

interface Options {
  onLongPress: () => void
  delay?: number
}

export const useLongPress = ({ onLongPress, delay = 500 }: Options) => {
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    timeout.current = setTimeout(() => {
      onLongPress()
    }, delay)
  }, [onLongPress, delay])

  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }
  }, [])

  return {
    onTouchStart: start,
    onTouchEnd: clear,
  }
}
