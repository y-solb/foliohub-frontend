'use client'

import httpClient from '@/lib/httpClient'
import Image from 'next/image'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AiOutlineLogout, AiOutlineEdit, AiOutlineUser } from 'react-icons/ai'
import { AuthInfo } from '@/types'
import { useLogoutMutation } from '@/hooks/queries/auth'
import { useSetRecoilState } from 'recoil'
import authInfoState from '@/recoil/atoms/authInfoState'

interface UserMenuProps {
  authInfo: AuthInfo
}

function UserMenu({ authInfo: { id, username, thumbnail } }: UserMenuProps) {
  const setAuthInfo = useSetRecoilState(authInfoState)
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

  return (
    <div className="relative">
      <button
        type="button"
        className="relative w-10 h-10 rounded-full border border-solid border-gray-100 overflow-hidden"
        onClick={() => setIsOpenNav(true)}
      >
        <Image src={thumbnail} alt={`image_${id}`} priority fill />
      </button>
      {isOpenNav && (
        <nav
          ref={outRef}
          className="absolute right-0 -bottom-[11.5rem] bg-white w-52 border border-solid border-gray-200 rounded-2xl"
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
                href={`/edit/${username}`}
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
  )
}

export default UserMenu
