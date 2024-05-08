'use client'

import PortfolioList from '@/components/portfolio/PortfolioList'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useRef } from 'react'

function RecentPortfolioList() {
  const { data, fetchNextPage, isFetching, hasNextPage } =
    useInfinitePortfolioQuery()

  const fetchMorePortfolio = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage()
    }
  }
  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  return (
    <PortfolioList
      // isFetching={isFetching}
      loaderRef={loaderRef}
      portfolios={data?.pages[0].data ?? []}
    />
  )
}

export default RecentPortfolioList
