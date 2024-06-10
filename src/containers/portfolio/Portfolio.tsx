'use client'

import PortfolioWrapper from '@/components/portfolio/PortfolioWrapper'
import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'
import Profile from '@/containers/portfolio/Profile'
import { useAuthQuery } from '@/hooks/queries/auth'
import { usePortfolioQuery } from '@/hooks/queries/portfolio'
import Link from 'next/link'

interface PortfolioProps {
  username: string
}

export default function Portfolio({ username }: PortfolioProps) {
  const { data, isLoading } = usePortfolioQuery(username)
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useAuthQuery()

  if (isLoading || isLoadingCurrentUser || !data) {
    return null
  }
  return (
    <>
      <PortfolioWrapper>
        <Profile portfolio={data} />
        <AssetGridLayout portfolio={data} layouts={data.layout} />
      </PortfolioWrapper>
      {currentUser?.username === username && (
        <Link
          href={`/edit/${username}`}
          className="absolute flex items-center top-5 right-5 md:right-10 h-10 px-6 rounded-full text-white bg-black"
        >
          편집하기
        </Link>
      )}
    </>
  )
}
