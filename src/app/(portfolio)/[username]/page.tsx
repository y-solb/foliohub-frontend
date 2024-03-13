'use client'

import PortfolioWrapper from '@/components/portfolio/PortfolioWrapper'
import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'
import Profile from '@/containers/portfolio/Profile'
import { usePortfolioQuery } from '@/hooks/queries/portfolio'
import Link from 'next/link'

export default function UserPage({ params }: { params: { username: string } }) {
  const { data, isLoading } = usePortfolioQuery(params.username)

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
        href={`/edit/${params.username}`}
        className="fixed flex items-center bottom-8 left-8 h-8 px-5 rounded-2xl border border-solid border-gray-600 text-gray-600 bg-white"
      >
        편집하기
      </Link>
    </>
  )
}
