'use client'

import { useAuthQuery } from '@/hooks/queries/auth'
import httpClient from '@/lib/httpClient'
import authInfoState from '@/recoil/atoms/authInfoState'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

function BaseLayout() {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)

  const { data, refetch } = useAuthQuery()

  const currentUser = data ?? null

  useEffect(() => {
    if (currentUser?.accessToken) {
      httpClient.defaults.headers.common.Authorization = `Bearer ${currentUser.accessToken}`
    }
    setAuthInfo(currentUser)
  }, [setAuthInfo, currentUser])

  return (
    <div>
      <p>BaseLayout</p>
      <p>user:{authInfo ? authInfo.userId : '비회원'}</p>
      <button type="button" onClick={() => refetch}>
        api 요청
      </button>
    </div>
  )
}

export default BaseLayout
