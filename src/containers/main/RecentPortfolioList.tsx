'use client'

import PortFolioList from '@/components/portfolio/PortfolioList'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useMemo, useRef } from 'react'

function RecentPortfolioList() {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
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
    <PortFolioList
      isLoading={isLoading}
      isFetching={isFetching}
      loaderRef={loaderRef}
      portfolios={portfolios}
    />
  )
}

export default RecentPortfolioList
