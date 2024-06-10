'use client'

import { useAuthQuery } from '@/hooks/queries/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'
import useOpenAuthModal from '@/hooks/useOpenAuthModal'
import HeaderSkeleton from './HeaderSkeleton'
import UserMenu from './UserMenu'
import Logo from '../common/Logo'

function Header() {
  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useAuthQuery()
  const openModal = useOpenAuthModal()

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

  if (isLoadingCurrentUser) return <HeaderSkeleton />

  return (
    <div
      className={`fixed top-0 left-0 z-10 w-full flex items-center justify-between lg:px-20 px-10 h-16 transition-all duration-300 bg-white 
      ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'} 
      ${isHeaderVisible && lastScrollTop > 50 ? 'shadow-md' : ''}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {currentUser ? (
        <UserMenu authInfo={currentUser} />
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
