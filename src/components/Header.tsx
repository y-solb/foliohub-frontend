'use client'

import { useAuthQuery } from '@/hooks/queries/auth'
import authInfoState from '@/recoil/atoms/authInfoState'
import authModalState from '@/recoil/atoms/authModalState'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'
import HeaderSkeleton from './HeaderSkeleton'
import UserMenu from './UserMenu'

function Header() {
  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)
  const setAuthModal = useSetRecoilState(authModalState)
  const { data, isLoading } = useAuthQuery()

  const openModal = () => {
    setAuthModal(true)
  }

  const currentUser = data ?? null

  useEffect(() => {
    setAuthInfo(currentUser)
  }, [setAuthInfo, currentUser])

  useEffect(() => {
    const handleScroll = throttle(100, () => {
      const currentScrollTop = window.scrollY

      setHeaderVisible(
        currentScrollTop < lastScrollTop || currentScrollTop < 50,
      )
      setLastScrollTop(currentScrollTop)
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])

  if (isLoading) return <HeaderSkeleton />

  return (
    <div
      className={`fixed top-0 left-0 z-10 w-full flex items-center justify-between lg:px-20 px-10 h-16 transition-all duration-300 bg-white 
      ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'} 
      ${isHeaderVisible && lastScrollTop > 50 ? 'shadow-md' : ''}
      `}
    >
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
        <UserMenu authInfo={authInfo} />
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
