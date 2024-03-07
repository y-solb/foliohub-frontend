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
      <div className=" px-6">
        <ul className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {portfolios.map((portfolio) => (
            <li key={portfolio.id} className="grid-item-wrapper h-80">
              <Link
                href={`/${portfolio.userId}`}
                className="flex flex-col items-center px-10 py-8 w-full h-full"
              >
                <div className="relative flex w-32 h-32 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden">
                  {portfolio.thumbnail && (
                    <Image
                      src={portfolio.thumbnail}
                      alt={`image_${portfolio.id}`}
                      priority
                      fill
                    />
                  )}
                </div>
                <div className="flex flex-col items-center mt-4 gap-2">
                  <h2>{portfolio.displayName}</h2>
                  <p className="body1 text-gray-400 ellipsis2">
                    {portfolio.shortBio}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          {isFetching && (
            <p>무한스크롤 추가로 데이터 가져오는 스켈레톤 UI 추가</p>
          )}
        </ul>
        <div ref={loaderRef}>로딩중</div>
      </div>
    </div>
  )
}
