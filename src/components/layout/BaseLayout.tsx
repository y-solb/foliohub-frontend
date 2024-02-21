'use client'

import httpClient from '@/lib/httpClient'
import authInfoState from '@/recoil/atoms/authInfoState'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

function BaseLayout() {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)

  const getData = async () => {
    try {
      const { data } = await httpClient.get('/v1/auth')
      if (!data.currentUser) return
      if (data.currentUser.accessToken) {
        httpClient.defaults.headers.common.Authorization = `Bearer ${data.currentUser.accessToken}`
      }
      setAuthInfo(data.currentUser)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <p>BaseLayout</p>
      <p>user:{authInfo ? authInfo.username : '비회원'}</p>
      <button type="button" onClick={getData}>
        api 요청
      </button>
    </div>
  )
}

export default BaseLayout
