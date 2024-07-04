'use client'

import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'
import Profile from '@/containers/portfolio/Profile'
import { useAuthQuery } from '@/hooks/queries/auth'
import { usePortfolioQuery } from '@/hooks/queries/portfolio'
import PortfolioLayout from '@/components/layout/PortfolioLayout'
import ButtonLink from '@/components/common/ButtonLink'

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
      <PortfolioLayout>
        <Profile portfolio={data} />
        <AssetGridLayout portfolio={data} layouts={data.layout} />
      </PortfolioLayout>
      {currentUser?.username === username && (
        <ButtonLink
          href={`/edit/${username}`}
          className="absolute flex items-center top-5 right-5 md:right-10"
        >
          편집하기
        </ButtonLink>
      )}
    </>
  )
}
