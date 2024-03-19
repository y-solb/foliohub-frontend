'use client'

import PortfolioWrapper from '@/components/portfolio/PortfolioWrapper'
import AssetGridLayout from '@/containers/portfolio/AssetGridLayout'
import Profile from '@/containers/portfolio/Profile'
import { useAuthQuery } from '@/hooks/queries/auth'
import { usePortfolioQuery } from '@/hooks/queries/portfolio'
import authInfoState from '@/recoil/atoms/authInfoState'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

interface PortfolioProps {
  username: string
}

export default function Portfolio({ username }: PortfolioProps) {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)

  const { data, isLoading } = usePortfolioQuery(username)
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useAuthQuery()

  useEffect(() => {
    setAuthInfo(currentUser ?? null)
  }, [setAuthInfo, currentUser])

  if (isLoading || isLoadingCurrentUser || !data) {
    return null
  }
  return (
    <>
      <PortfolioWrapper>
        <Profile portfolio={data} />
        <AssetGridLayout portfolio={data} layouts={data.layout} />
      </PortfolioWrapper>
      {authInfo?.username === username && (
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
