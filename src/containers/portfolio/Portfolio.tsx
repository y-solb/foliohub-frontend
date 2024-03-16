'use client'

import PortfolioWrapper from '@/components/portfolio/PortfolioWrapper'
import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'
import Profile from '@/containers/portfolio/Profile'
import { usePortfolioQuery } from '@/hooks/queries/portfolio'
import Link from 'next/link'

interface PortfolioProps {
  username: string
}

export default function Portfolio({ username }: PortfolioProps) {
  const { data, isLoading } = usePortfolioQuery(username)

  if (isLoading || !data) {
    return null
  }
  return (
    <>
      <PortfolioWrapper>
        <Profile portfolio={data} />
        <AssetGridLayout portfolio={data} layouts={data.layout} />
      </PortfolioWrapper>
      <Link
        href={`/edit/${username}`}
        className="fixed flex items-center bottom-8 left-8 h-8 px-5 rounded-2xl border border-solid border-gray-600 text-gray-600 bg-white"
      >
        편집하기
      </Link>
    </>
  )
}
