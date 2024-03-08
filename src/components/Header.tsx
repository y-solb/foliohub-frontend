'use client'

import { useLogoutMutation } from '@/hooks/queries/auth'
import httpClient from '@/lib/httpClient'
import authInfoState from '@/recoil/atoms/authInfoState'
import authModalState from '@/recoil/atoms/authModalState'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState, useSetRecoilState } from 'recoil'

function Header() {
  const setAuthModal = useSetRecoilState(authModalState)
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)
  const { mutate } = useLogoutMutation()

  const handleLogout = () => {
    mutate()
    setAuthInfo(null)
    httpClient.defaults.headers.common.Authorization = ''
  }

  const openModal = () => {
    setAuthModal(true)
  }

  return (
    <div className="flex justify-between px-8 py-4">
      <div className="flex items-center justify-center gap-2">
        <Link href="/">
          <Image
            src="/foliohub_text.svg"
            alt="text_logo"
            width={120}
            height={32}
          />
        </Link>
      </div>
      {authInfo ? (
        <button
          type="button"
          onClick={handleLogout}
          className="h-8 px-5 rounded-2xl border border-solid border-gray-600 text-gray-600 bg-white"
        >
          로그아웃
        </button>
      ) : (
        <button
          type="button"
          onClick={openModal}
          className="h-8 px-5 rounded-2xl border border-solid border-gray-600 text-gray-600 bg-white"
        >
          로그인
        </button>
      )}
    </div>
  )
}

export default Header
