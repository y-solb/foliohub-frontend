'use client'

import Image from 'next/image'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AuthInfo } from '@/types'
import { useLogoutMutation } from '@/hooks/queries/auth'
import { BiLogOutCircle, BiUser, BiPencil } from 'react-icons/bi'
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
                <BiUser size={24} />
                <span>마이페이지</span>
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-100">
              <Link
                href={`/edit/${username}`}
                className="flex items-center gap-6 h-8 text-black body2"
              >
                <BiPencil size={24} />
                <span>포트폴리오 수정</span>
              </Link>
            </li>
            <div className="h-[1px] bg-gray-200 mx-6 my-2" />
            <li className="px-6 py-2 hover:bg-gray-100">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-6 h-8 text-black body2"
              >
                <BiLogOutCircle size={24} />
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
