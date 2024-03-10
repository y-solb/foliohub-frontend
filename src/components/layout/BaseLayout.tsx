'use client'

import { useAuthQuery } from '@/hooks/queries/auth'
import httpClient from '@/lib/httpClient'
import authInfoState from '@/recoil/atoms/authInfoState'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Header from '@/components/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)

  const { data } = useAuthQuery()

  const currentUser = data ?? null
  console.log(authInfo)
  useEffect(() => {
    if (currentUser?.accessToken) {
      httpClient.defaults.headers.common.Authorization = `Bearer ${currentUser.accessToken}`
    }
    setAuthInfo(currentUser)
  }, [setAuthInfo, currentUser])

  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default BaseLayout
