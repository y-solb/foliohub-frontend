'use client'

import Header from '@/components/Header'
import BaseLayout from '@/components/layout/BaseLayout'
import { useInfinitePortfolioQuery } from '@/hooks/queries/portfolio'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import Link from 'next/link'
import { useMemo, useRef } from 'react'
import Image from 'next/image'

export default function Home() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useInfinitePortfolioQuery()
  const portfolios = useMemo(() => {
    return [...(data?.pages?.flatMap((page) => page.data) || [])]
  }, [data])

  const fetchMorePortfolio = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage()
    }
  }

  useInfiniteScroll(loaderRef, fetchMorePortfolio)

  if (isLoading || !data) return null

  return (
    <div>
      <Header />
      <BaseLayout />
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id} className="h-96">
            <Link href={`/${portfolio.userId}`}>
              <p>{portfolio.displayName}</p>
              <p>{portfolio.shortBio}</p>
              <p>{portfolio.userId}</p>
              {portfolio.thumbnail && (
                <Image
                  src={portfolio.thumbnail}
                  alt={`image_${portfolio.id}`}
                  priority
                  width={50}
                  height={50}
                />
              )}
            </Link>
          </li>
        ))}
        {isFetching && (
          <p>무한스크롤 추가로 데이터 가져오는 스켈레톤 UI 추가</p>
        )}
      </ul>
      <div ref={loaderRef}>로딩중</div>
    </div>
  )
}
