'use client'

import PortfolioItem from '@/components/portfolio/PortfolioItem'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useMemo, useRef } from 'react'

function RecentPortfolioList() {
  const { data, fetchNextPage, isFetching, hasNextPage } =
    useInfinitePortfolioQuery()

  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  const fetchMorePortfolio = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage()
    }
  }
  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  return (
    <>
      <ul className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:px-20 px-10">
        {portfolios?.map((portfolio) => (
          <PortfolioItem key={portfolio.id} portfolio={portfolio} />
        ))}
      </ul>
      <div ref={loaderRef} className="h-8" />
    </>
  )
}

export default RecentPortfolioList
