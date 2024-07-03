'use client'

import PortfolioList from '@/components/portfolio/PortfolioList'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useMemo, useRef } from 'react'

function RecentPortfolioList() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePortfolioQuery()

  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  const fetchMorePortfolio = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }
  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  return (
    <PortfolioList
      isFetchingNextPage={isFetchingNextPage}
      loaderRef={loaderRef}
      portfolios={portfolios}
    />
  )
}

export default RecentPortfolioList
