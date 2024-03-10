'use client'

import { useLogoutMutation, useAuthQuery } from '@/hooks/queries/auth'
import httpClient from '@/lib/httpClient'
import authInfoState from '@/recoil/atoms/authInfoState'
import authModalState from '@/recoil/atoms/authModalState'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AiOutlineLogout, AiOutlineEdit, AiOutlineUser } from 'react-icons/ai'
import HeaderSkeleton from './HeaderSkeleton'

function Header() {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState)
  const setAuthModal = useSetRecoilState(authModalState)
  const { data, isLoading } = useAuthQuery()
  const { mutate } = useLogoutMutation()
  const [isOpenNav, setIsOpenNav, outRef] = useOutsideClick<HTMLDivElement>(
    () => {
      setIsOpenNav(false)
    },
  )

  const handleLogout = () => {
    mutate()
    setAuthInfo(null)
    httpClient.defaults.headers.common.Authorization = ''
  }

  const openModal = () => {
    setAuthModal(true)
  }

  const currentUser = data ?? null
  console.log(authInfo)
  useEffect(() => {
    if (currentUser?.accessToken) {
      httpClient.defaults.headers.common.Authorization = `Bearer ${currentUser.accessToken}`
    }
    setAuthInfo(currentUser)
  }, [setAuthInfo, currentUser])

  if (isLoading) return <HeaderSkeleton />

  return (
    <div className="relative flex items-center justify-between px-8 py-4 h-20">
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
        <div className="relative">
          <button
            type="button"
            className="relative w-10 h-10 rounded-full border border-solid border-gray-100 shadow-md overflow-hidden"
            onClick={() => setIsOpenNav(true)}
          >
            <Image
              src={authInfo.thumbnail}
              alt={`image_${authInfo.id}`}
              priority
              fill
            />
          </button>
          {isOpenNav && (
            <nav
              ref={outRef}
              className="absolute right-0 -bottom-[11.5rem] bg-white w-52 z-10 border border-solid border-gray-200 rounded-2xl"
            >
              <ul className="py-2">
                <li className="px-6 py-2 hover:bg-gray-100">
                  <Link
                    href="/mypage"
                    className="flex items-center gap-6 h-8 text-black body2"
                  >
                    <AiOutlineUser size={24} />
                    <span>마이페이지</span>
                  </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-100">
                  <Link
                    href={`/edit/${authInfo?.userId}`}
                    className="flex items-center gap-6 h-8 text-black body2"
                  >
                    <AiOutlineEdit size={24} />
                    <span>내 포트폴리오 수정</span>
                  </Link>
                </li>
                <div className="h-[1px] bg-gray-200 mx-6 my-2" />
                <li className="px-6 py-2 hover:bg-gray-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-6 h-8 text-black body2"
                  >
                    <AiOutlineLogout size={24} />
                    <span>로그아웃</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
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
