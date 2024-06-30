'use client'

import Image from 'next/image'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import { AuthInfo } from '@/types'
import { useLogoutMutation } from '@/hooks/queries/auth'
import { BiLogOutCircle, BiUser, BiPencil } from 'react-icons/bi'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import { useRouter } from 'next/navigation'
import EmptyThumbnail from '@/components/common/EmptyThumbnail'

interface UserMenuProps {
  authInfo: AuthInfo
}

function UserMenu({ authInfo: { id, username, thumbnail } }: UserMenuProps) {
  const router = useRouter()
  const { mutate } = useLogoutMutation()
  const { openAlert } = useOpenAlertModal()
  const [isOpenNav, setIsOpenNav, outRef] = useOutsideClick<HTMLDivElement>(
    () => {
      setIsOpenNav(false)
    },
  )

  const handleOpenNav = () => {
    setIsOpenNav(true)
  }

  const handleLogout = () => {
    mutate()
    router.push('/')
    openAlert('로그아웃이 완료되었어요!', '다음에 다시 만나요 👋')
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="w-10 h-10 rounded-full border border-solid border-gray-100 overflow-hidden"
        onClick={handleOpenNav}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            className="w-full h-full object-cover"
            alt={`image_${id}`}
            width={40}
            height={40}
            priority
          />
        ) : (
          <EmptyThumbnail />
        )}
      </button>
      {isOpenNav && (
        <nav
          ref={outRef}
          className="absolute right-0 bg-white w-52 border border-solid border-gray-200 rounded-2xl"
        >
          <ul className="py-2">
            <li className="hover:bg-gray-100">
              <Link
                href="/mypage"
                className="flex items-center gap-6 w-full min-h-8 text-black body2 px-6 py-2"
              >
                <BiUser size={24} />
                <span>마이페이지</span>
              </Link>
            </li>
            <li className="hover:bg-gray-100">
              <Link
                href={`/edit/${username}`}
                className="flex items-center gap-6 w-full min-h-8 text-black body2 px-6 py-2"
              >
                <BiPencil size={24} />
                <span>포트폴리오 수정</span>
              </Link>
            </li>
            <div className="h-[1px] bg-gray-200 mx-6 my-2" />
            <li className="hover:bg-gray-100">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-6 w-full min-h-8 text-black body2 px-6 py-2"
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
