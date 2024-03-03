import { useEffect } from 'react'

export default function useInfiniteScroll(
  loaderRef: React.RefObject<HTMLElement>,
  fetchMoreData: () => void,
) {
  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          fetchMoreData()
        }
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(loaderRef.current)

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect()
    }
  }, [loaderRef, fetchMoreData])
}
